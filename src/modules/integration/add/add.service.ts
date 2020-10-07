import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCopy } from '../../book/book-copy.entity';
import { Book } from '../../book/book.entity';

@Injectable()
export class AddService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(BookCopy)
    private bookCopyRepository: Repository<BookCopy>,
  ) {}

  public async run(command: string): Promise<string> {
    if (command == 'add') {
      return 'Comando inválido veja mais em `/acervo help`.';
    }

    const title = 'aa';
    const author = 'bb';
    const serial_numbers = ['0005', '0006'];

    const book = await this.bookRepository.save({
      title,
      author,
    });

    serial_numbers.forEach(async serial_number => {
      await this.bookCopyRepository.save({
        book,
        serial_number,
      });
    });

    return `O livro ${book.title} foi criado com sucesso assim como suas copias ${serial_numbers.toString}.`;
  }
}
