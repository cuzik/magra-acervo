import { Injectable } from '@nestjs/common';
import { AddService } from './add/add.service';
import { ConsultService } from './consult/consult.service';
import { ReturnService } from './return/return.service';
import { TakeService } from './take/take.service';

@Injectable()
export class SlackService {
  constructor(
    private takeService: TakeService,
    private returnService: ReturnService,
    private consultService: ConsultService,
    private addService: AddService,
  ) {}

  public validateCommand(command: string): boolean {
    return command != '';
  }

  public async runCommand(user_name: string, command: string): Promise<string> {
    const command_name = command.split(' ')[0];

    switch (command_name) {
      case 'help':
        return this.helpCommand();
      case 'list':
        return this.dashboardCommand();
      case 'take':
        return this.takeService.run(user_name, command);
      case 'return':
        return this.returnService.run(user_name, command);
      case 'consult':
        return this.consultService.run(command);
      case 'add':
        return this.addService.run(command);
      default:
        return `${user_name} o comando /${command_name} não é valido.`;
    }
  }

  private helpCommand(): string {
    return `Esse comando pode ser usado digitando /acervo <command> <params>
      | Command | params | Description | Usage |
      |---------|---|---|---|
      | help | - | return a list of command and usage | /acervo help |
      | list | - | return a link that contains the dashboard with a list of all book and copies | /acervo list |
      | take | serial_number | registry when you take a book | /acervo take <serial_number> |
      | return | serial_number | registry when you return a book | /acervo return <serial_number> |
      | consult | serial_number | consult if a book is avaliable | /acervo return <serial_number> |
      | add | title author [serial_number, serial_number, ...] | add a book and copies | /acervo add <title> <author> [ <list_of_serial_numbers> ] |`;
  }

  private dashboardCommand(): string {
    return `Você pode converir os livros em [dashboard](${this.dashboardLink()}).`;
  }

  private dashboardLink(): string {
    return process.env.DASHBOARD_LINK || '';
  }
}
