import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCopy } from '../book/book-copy.entity';
import { Reservation } from '../reservation/reservation.entity';
import { ReservationStatus } from '../reservation/reservation.interface';

@Injectable()
export class SlackService {
  constructor(
    @InjectRepository(BookCopy)
    private bookCopyRepository: Repository<BookCopy>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>
  ) {}

  public validateCommand(command :string): boolean {
    return command != '';
  }

  public async runCommand(user_name: string, command :string): Promise<string> {
    const command_name = command.split(' ')[0];

    if (command_name == 'help') {
      return this.helpCommand()
    }

    if (command_name == 'take') {
      return this.takeCommand(user_name, command)
    }

    return `${user_name} o comando /${command_name} não é valido.`;
  }

  private helpCommand(): string {
    return 'comando em construção.';
  }

  private async takeCommand(user_name: string, command :string): Promise<string> {
    if (command == 'take') {
      return 'Comando inválido veja mais em `/acervo help`.';
    }

    const serial_number = command.replace('take ', '');
    const bookCopy = await this.bookCopyRepository.findOne({ serial_number: serial_number })

    if (bookCopy == null) {
      return `O serial_number ${serial_number} não está cadastrado.`;
    }

    const reservation = await this.reservationRepository.findOne({ bookCopy: bookCopy, status: ReservationStatus.pick_up})

    if (reservation != null) {
      return `Este livro já está com ${reservation.user_name}`
    }

    await this.reservationRepository.save({
      user_name: user_name,
      bookCopy: bookCopy,
      status: ReservationStatus.pick_up
    });

    return `${user_name} você realizou a retirada do livro.`;
  }
}
