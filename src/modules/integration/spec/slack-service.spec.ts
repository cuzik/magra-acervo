import { Test } from '@nestjs/testing';
import { SlackService } from '../slack.service';

describe('Slack commands service tests', () => {
  let slackService: SlackService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [SlackService],
    }).compile();

    slackService = module.get(SlackService);
  });

  describe('validateCommand', () => {
    it('should return false when pass an invalid command', async () => {
      expect(
        slackService.validateCommand(''),
      ).toBeFalsy();
    });

    it('should return treu when pass a valid command', async () => {
      expect(
        slackService.validateCommand('help'),
      ).toBeTruthy();
    });
  })

  describe('runCommand with help command', () => {
    let command: string;
    let name: string;

    it('should return help instructions', async () => {
      command = 'help';
      const msg = await slackService.runCommand(name, command);

      expect(msg).toBe('comando em construção');
    });
  })
});
