import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCopy } from './book-copy.entity';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCopy])],
})
export class BookModule {}
