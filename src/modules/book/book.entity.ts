import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookCopy } from './book-copy.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public author: string;

  @OneToMany(
    () => BookCopy,
    bookCopy => bookCopy.book,
  )
  public bookCopys: BookCopy[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
