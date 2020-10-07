import { Test } from '@nestjs/testing';
import { TypeOrmModuleTest } from '../../../../../test/helpers/database';
import { IntegrationModule } from '../../integration.module';
import { ConsultService } from '../consult.service';

describe('Consult service test', () => {
  let consultService: ConsultService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    consultService = module.get(ConsultService);
  });

  it('should return invelid commnad', async () => {
    const msg = await consultService.run('consult');

    expect(msg).toBe('Comando inválido veja mais em `/acervo help`.');
  });

  it('should not foult book copy', async () => {
    const msg = await consultService.run('consult 098ASDS25DH8W');

    expect(msg).toBe('O serial_number 098ASDS25DH8W não está cadastrado.');
  });
});
