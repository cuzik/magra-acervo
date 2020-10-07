import { Test } from '@nestjs/testing';
import { TypeOrmModuleTest } from '../../../../../test/helpers/database';
import { IntegrationModule } from '../../integration.module';
import { AddService } from '../add.service';

describe('Add service test', () => {
  let addService: AddService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    addService = module.get(AddService);
  });

  it('should add invelid commnad', async () => {
    const msg = await addService.run('add');

    expect(msg).toBe('Comando inválido veja mais em `/acervo help`.');
  });
});
