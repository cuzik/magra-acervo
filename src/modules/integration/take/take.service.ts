import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCopy } from '../../book/book-copy.entity';
import { Reservation } from '../../reservation/reservation.entity';
import { ReservationStatus } from '../../reservation/reservation.interface';

@Injectable()
export class TakeService {
  constructor(
    @InjectRepository(BookCopy)
    private bookCopyRepository: Repository<BookCopy>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  public async run(user_name: string, command: string): Promise<string> {
    if (command == 'take') {
      return 'Comando inválido veja mais em `/acervo help`.';
    }

    const serial_number = command.replace('take ', '');
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

    if (reservation != null) {
      return `Este livro já está com ${reservation.user_name}`;
    }

    await this.reservationRepository.save({
      user_name,
      bookCopy,
      status: ReservationStatus.pick_up,
    });

    return `${user_name} você realizou a retirada do livro.`;
  }
}
