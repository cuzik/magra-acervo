import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IntegrationModule } from '../../../../src/modules/integration/integration.module';
import * as request from 'supertest';
import { TypeOrmModuleTest } from '../../../helpers/database';

describe('SlackController (e2e)', () => {
  let app: INestApplication;
  let data: { user_name: string, text: string };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('POST /integration/slack with command help', async () => {
    data = {
      user_name: 'fulaninho.42',
      text: 'help'
    }

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('comando em construção.');
  });

  it('POST /integration/slack with command list', async () => {
    data = {
      user_name: 'fulaninho.42',
      text: 'list'
    }

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('Você pode converir os livros em [dashboard]().');
  });

  it('POST /integration/slack with empty command', async () => {
    data = {
      user_name: 'fulaninho.42',
      text: ''
    }

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('Comando inválido veja mais em `/acervo help`');
  });

  afterAll(async () => {
    await app.close();
  });
});
