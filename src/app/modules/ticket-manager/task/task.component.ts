import { Component, OnInit, Input } from '@angular/core';
import { Dropdown } from 'src/app/core/models/dropdown.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subtask } from 'src/app/core/models/ticket-manager/task/subtask.model';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { Task } from 'src/app/core/models/ticket-manager/task/task.model';
import { TaskService } from 'src/app/core/services/task-manager/task.service';
import { must_greatest } from 'src/app/core/helpers/dates';
import { DateFunction } from 'src/app/core/helpers/dates';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
@Input() idTicket: number;

  vista: number;
  listtype: Dropdown[] = [];
  formSubTask: FormGroup;
  formTask: FormGroup;
  subTaskSelected: number;
  writeSubTask: boolean;
  listSubTask: Subtask[] = [];
  task: Task;
  esfuerzo = '0  days 0 hours 0 minutes';

  constructor(private formBuildSubTask: FormBuilder, private formBuildTask: FormBuilder,
              private dropdownServ: DropdownService, private taskServ: TaskService) {
    this.formSubTask = this.formBuildSubTask.group({
      description: ['', Validators.required],
      typeTask: ['', Validators.required],
      start: ['', Validators.required],
      finish: ['', Validators.required]
    }, {
      validators: must_greatest('start', 'finish')
    });

    this.formTask = this.formBuildTask.group({
      description: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.vista = 0;
    this.writeSubTask = false;
    this.listSubTask = [];
    this.task = new Task();
    this.task.subTasks = this.listSubTask;

    this.dropdownServ.getDropdownByTable('typeTask').subscribe((data: Dropdown[]) => { this.listtype = data; });
  }

  openform() {
    this.vista = 1;
  }

  addSubTask() {
      this.writeSubTask = true;
      this.subTaskSelected = 0;
  }

  registerSubTask() {
    if (this.formSubTask.valid) {

      this.writeSubTask = false;
      this.subTaskSelected = 0;
      const item = new Subtask();

      item.description = this.formSubTask.controls.description.value;
      item.type = this.formSubTask.controls.typeTask.value;
      item.started = this.formSubTask.controls.start.value;
      item.finished = this.formSubTask.controls.finish.value;
      item.id = ( this.listSubTask.length === 0 ) ? 1 : this.listSubTask[this.listSubTask.length - 1 ].id + 1;
      item.time = Math.abs((item.finished.getTime() - item.started.getTime()) / 1000 );
      item.typeText = this.listtype.filter( v => v.id === item.id)[0].value;
      item.status = 1;
      this.listSubTask.push(item);
      this.formSubTask.reset();
      this.writeSubTask = false;

      this.esfuerzo = new DateFunction().get_TimeInverted( this.listSubTask.reduce((sum, current) => sum + current.time, 0));
    }
  }

  cancelSubTask() {
    this.writeSubTask = false;
    this.subTaskSelected = 0;
  }

  cancelTask() {
    this.formSubTask.reset();
    this.formTask.reset();
    this.listSubTask = [];
    this.vista = 0;
  }

  registerTask() {
    if ( this.formTask.valid) {
      this.vista = 0;
      this.task.mainDescription = this.formTask.controls.description.value;
      this.task.idTicket = this.idTicket;
      this.task.subTasks = this.listSubTask;
      this.taskServ.create(this.task).subscribe((data: Subtask) => {
        console.log(data);
      });
    }
  }
}
