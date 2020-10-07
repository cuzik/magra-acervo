import { Test } from '@nestjs/testing';
import { TypeOrmModuleTest } from '../../../../../test/helpers/database';
import { IntegrationModule } from '../../integration.module';
import { ReturnService } from '../return.service';

describe('Return service test', () => {
  let returnService: ReturnService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    returnService = module.get(ReturnService);
  });

  it('should return invelid commnad', async () => {
    const msg = await returnService.run('name.65', 'return');

    expect(msg).toBe('Comando inválido veja mais em `/acervo help`.');
  });

  it('should not foult book copy', async () => {
    const msg = await returnService.run('name.65', 'return 098ASDS25DH8W');

    expect(msg).toBe('O serial_number 098ASDS25DH8W não está cadastrado.');
  });
});
