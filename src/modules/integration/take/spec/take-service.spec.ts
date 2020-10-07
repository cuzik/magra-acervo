import { Test } from '@nestjs/testing';
import { TypeOrmModuleTest } from '../../../../../test/helpers/database';
import { IntegrationModule } from '../../integration.module';
import { TakeService } from '../take.service';

describe('Take service test', () => {
  let takeService: TakeService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    takeService = module.get(TakeService);
  });

  it('should take invelid commnad', async () => {
    const msg = await takeService.run('name.65', 'take');

    expect(msg).toBe('Comando inválido veja mais em `/acervo help`.');
  });

  it('should not foult book copy', async () => {
    const msg = await takeService.run('name.65', 'take 098ASDS25DH8W');

    expect(msg).toBe('O serial_number 098ASDS25DH8W não está cadastrado.');
  });
});
