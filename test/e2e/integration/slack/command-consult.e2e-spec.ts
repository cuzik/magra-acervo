import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IntegrationModule } from '../../../../src/modules/integration/integration.module';
import * as request from 'supertest';
import { TypeOrmModuleTest } from '../../../helpers/database';
import { Book } from '../../../../src/modules/book/book.entity';
import { getRepository } from 'typeorm';
import { BookCopy } from '../../../../src/modules/book/book-copy.entity';
import { Reservation } from '../../../../src/modules/reservation/reservation.entity';
import { ReservationStatus } from '../../../../src/modules/reservation/reservation.interface';

describe('SlackController (e2e) POST /integration/slack with consult command', () => {
  let app: INestApplication;
  let data: { user_name: string, text: string };

  const createBookCopy = async (serial_number: string): Promise<void> => {
    const book = await getRepository(Book).save(
      {title: 'Um livro qualquer', author: 'Fulano'}
    );

    await getRepository(BookCopy).save(
      {serial_number: serial_number, book: book}
    );
  };

  const createReservation = async (user_name: string, serial_number: string): Promise<void> => {
    const bookCopy = await getRepository(BookCopy).findOne({serial_number: serial_number});

    await getRepository(Reservation).save({
      user_name: user_name,
      bookCopy: bookCopy,
      status: ReservationStatus.pick_up
    });
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return correct error message when pass invalid serial number', async () => {
    data = {
      user_name: 'fulaninho.42',
      text: `consult A8kf0-33`
    };

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('O serial_number A8kf0-33 não está cadastrado.');
  });

  it('should return erros message when try consult command without serial_number', async () => {
    data = {
      user_name: 'ciclaninho.42',
      text: 'consult'
    };

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('Comando inválido veja mais em `/acervo help`.');
  });

  it('should return correct message when try consult an unavailable book', async () => {
    const serial_number = '9PK7JS7';
    data = {
      user_name: 'ciclaninho.42',
      text: `consult ${serial_number}`
    };

    await createBookCopy(serial_number);
    await createReservation('usuario.one', serial_number);

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('Este livro está com usuario.one.');
  });

  it('should return correct message when try consult an available book', async () => {
    const serial_number = '9PK7JS7';
    data = {
      user_name: 'ciclaninho.42',
      text: `consult ${serial_number}`
    };

    await createBookCopy(serial_number);

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('O livro está disponível.');
  });

  afterEach(async () => {
    await getRepository(Reservation).clear();
    await getRepository(BookCopy).delete({});
    await getRepository(Book).delete({});
  });

  afterAll(async () => {
    await app.close();
  });
});
