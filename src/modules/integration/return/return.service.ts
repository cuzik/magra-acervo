import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCopy } from '../../book/book-copy.entity';
import { Reservation } from '../../reservation/reservation.entity';
import { ReservationStatus } from '../../reservation/reservation.interface';

@Injectable()
export class ReturnService {
  constructor(
    @InjectRepository(BookCopy)
    private bookCopyRepository: Repository<BookCopy>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  public async run(user_name: string, command: string): Promise<string> {
    if (command == 'return') {
      return 'Comando inválido veja mais em `/acervo help`.';
    }

    const serial_number = command.replace('return ', '');
    const bookCopy = await this.bookCopyRepository.findOne({
      serial_number,
    });

    if (bookCopy == null) {
      return `O serial_number ${serial_number} não está cadastrado.`;
    }

    const reservation = await this.reservationRepository.findOne({
      bookCopy,
      status: ReservationStatus.pick_up,
    });

    if (reservation == null) {
      return `Não há registro de retirada desse livro no momento.`;
    }

    if (reservation.user_name != user_name) {
      return `Este livro está com ${reservation.user_name}.`;
    }

    await this.reservationRepository.update(reservation.id, {
      status: ReservationStatus.returned,
    });

    return `${user_name} você realizou a devolução do livro.`;
  }
}
