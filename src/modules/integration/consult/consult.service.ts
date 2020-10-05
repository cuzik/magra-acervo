import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCopy } from '../../book/book-copy.entity';
import { Reservation } from '../../reservation/reservation.entity';
import { ReservationStatus } from '../../reservation/reservation.interface';

@Injectable()
export class ConsultService {
  constructor(
    @InjectRepository(BookCopy)
    private bookCopyRepository: Repository<BookCopy>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>
  ) {}

  public async run(command :string): Promise<string> {
    if (command == 'consult') {
      return 'Comando inválido veja mais em `/acervo help`.';
    }

    const serial_number = command.replace('consult ', '');
    const bookCopy = await this.bookCopyRepository.findOne({ serial_number: serial_number })

    if (bookCopy == null) {
      return `O serial_number ${serial_number} não está cadastrado.`;
    }

    const reservation = await this.reservationRepository.findOne({ bookCopy: bookCopy, status: ReservationStatus.pick_up})

    if (reservation != null) {
      return `Este livro está com ${reservation.user_name}.`
    }

    return 'O livro está disponível.';
  }
}
