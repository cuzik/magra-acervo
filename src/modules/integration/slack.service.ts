import { Injectable } from '@nestjs/common';

@Injectable()
export class SlackService {
  public validateCommand(command :string): boolean {
    return command != '';
  }

  public async runCommand(name: string, command :string): Promise<string> {
    if (command == 'help') {
      return this.helpCommand()
    }

    return `name: ${name}\ncommand:${command}`;
  }

  private helpCommand() {
    return "comando em construção"
  }
}
