import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookCopy } from './book-copy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCopy])],
})
export class BookModule {}
