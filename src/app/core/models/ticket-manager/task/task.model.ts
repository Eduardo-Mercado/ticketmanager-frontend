
import { Subtask } from 'src/app/core/models/ticket-manager/task/subtask.model';

export class Task {
  id: number;
 mainDescription: Text;
 idTicket: number;
 edit: boolean;
 subTasks: Array<Subtask>;
}
