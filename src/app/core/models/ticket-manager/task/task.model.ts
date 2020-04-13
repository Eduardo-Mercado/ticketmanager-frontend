
import { Subtask } from 'src/app/core/models/ticket-manager/task/subtask.model';

export class Task {
 mainDescription: Text;
 idTicket: number;
 subTasks: Array<Subtask>;
}
