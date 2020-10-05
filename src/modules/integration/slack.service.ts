import { Injectable } from '@nestjs/common';
import { TakeService } from './take/take.service';

@Injectable()
export class SlackService {
  constructor(
    private takeService: TakeService
  ) {}

  public validateCommand(command :string): boolean {
    return command != '';
  }

  public async runCommand(user_name: string, command :string): Promise<string> {
    const command_name = command.split(' ')[0];

    if (command_name == 'help') {
      return this.helpCommand()
    }

    if (command_name == 'take') {
      return this.takeService.run(user_name, command)
    }

    return `${user_name} o comando /${command_name} não é valido.`;
  }

  private helpCommand(): string {
    return 'comando em construção.';
  }
}
