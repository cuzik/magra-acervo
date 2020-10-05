import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from '../reservation/reservation.entity';
import { Book } from './book.entity';

@Entity()
export class BookCopy {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public serial_number: string;

  @ManyToOne(
    () => Book,
    book => book.bookCopys,
  )
  public book: Book;

  @OneToMany(
    () => Reservation,
    reservation => reservation.bookCopy,
  )
  public reservations: Reservation[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
