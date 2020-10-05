import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookCopy } from '../book/book-copy.entity';
import { ReservationStatus } from './reservation.interface';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public user_name: string;

  @Column({ enum: ReservationStatus })
  public status: ReservationStatus;

  @ManyToOne(
    () => BookCopy,
    bookCopy => bookCopy.reservations,
  )
  public bookCopy: BookCopy;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
