import { Injectable } from '@nestjs/common';
import { ConsultService } from './consult/consult.service';
import { ReturnService } from './return/return.service';
import { TakeService } from './take/take.service';

@Injectable()
export class SlackService {
  constructor(
    private takeService: TakeService,
    private returnService: ReturnService,
    private consultService: ConsultService,
  ) {}

  public validateCommand(command :string): boolean {
    return command != '';
  }

  public async runCommand(user_name: string, command :string): Promise<string> {
    const command_name = command.split(' ')[0];

    if (command_name == 'help') {
      return this.helpCommand()
    }

    if (command_name == 'list') {
      return this.dashboardCommand()
    }

    if (command_name == 'take') {
      return this.takeService.run(user_name, command)
    }

    if (command_name == 'return') {
      return this.returnService.run(user_name, command)
    }

    if (command_name == 'consult') {
      return this.consultService.run(command)
    }

    return `${user_name} o comando /${command_name} não é valido.`;
  }

  private helpCommand(): string {
    return 'comando em construção.';
  }

  private dashboardCommand(): string {
    return `Você pode converir os livros em [dashboard](${this.dashboardLink()}).`;
  }

  private dashboardLink(): string {
    return process.env.DASHBOARD_LINK || '';
  }
}
