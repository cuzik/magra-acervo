import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IntegrationModule } from '../../../../src/modules/integration/integration.module';
import * as request from 'supertest';
import { TypeOrmModuleTest } from '../../../helpers/database';

describe('SlackController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('POST /integration/slack with command help', async () => {
    const data = {
      user_name: 'fulaninho.42',
      text: 'help'
    }

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('comando em construção');
  });

  it('POST /integration/slack with empty command', async () => {
    const data = {
      user_name: 'fulaninho.42',
      text: ''
    }

    const { text } = await request(app.getHttpServer())
      .post('/integration/slack')
      .send(data)
      .expect(200);

    expect(text).toEqual('invalid command see more in `/acervo help`');
  });

  afterAll(async () => {
    await app.close();
  });
});
