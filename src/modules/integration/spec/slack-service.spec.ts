import { Test } from '@nestjs/testing';
import { TypeOrmModuleTest } from '../../../../test/helpers/database';
import { IntegrationModule } from '../integration.module';
import { SlackService } from '../slack.service';

describe('Slack commands service tests', () => {
  let slackService: SlackService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [IntegrationModule, TypeOrmModuleTest],
    }).compile();

    slackService = module.get(SlackService);
  });

  describe('validateCommand', () => {
    it('should return false when pass an invalid command', async () => {
      expect(slackService.validateCommand('')).toBeFalsy();
    });

    it('should return treu when pass a valid command', async () => {
      expect(slackService.validateCommand('help')).toBeTruthy();
    });
  });

  describe('runCommand with help command', () => {
    it('should return help instructions', async () => {
      const msg = await slackService.runCommand('', 'help');
      const expected_help_message = `Esse comando pode ser usado digitando /acervo <command> <params>
      | Command | params | Description | Usage |
      |---------|---|---|---|
      | help | - | return a list of command and usage | /acervo help |
      | list | - | return a link that contains the dashboard with a list of all book and copies | /acervo list |
      | take | serial_number | registry when you take a book | /acervo take <serial_number> |
      | return | serial_number | registry when you return a book | /acervo return <serial_number> |
      | consult | serial_number | consult if a book is avaliable | /acervo return <serial_number> |
      | add | title author [serial_number, serial_number, ...] | add a book and copies | /acervo add <title> <author> [ <list_of_serial_numbers> ] |`;

      expect(msg).toBe(expected_help_message);
    });
  });

  describe('runCommand with list command', () => {
    it('should return help instructions', async () => {
      const msg = await slackService.runCommand('', 'list');

      expect(msg).toBe('Você pode converir os livros em [dashboard]().');
    });
  });
});
