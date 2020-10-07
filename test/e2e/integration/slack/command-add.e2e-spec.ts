import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IntegrationModule } from '../../../../src/modules/integration/integration.module';
import * as request from 'supertest';
import { TypeOrmModuleTest } from '../../../helpers/database';

describe('SlackController (e2e)', () => {
  let app: INestApplication;
  let data: { user_name: string; text: string };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return erros message when try consult command without serial_number', async () => {
    data = {
      user_name: 'ciclaninho.42',
      text: 'add',
    };

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('Comando inválido veja mais em `/acervo help`.');
  });

  afterAll(async () => {
    await app.close();
  });
});
