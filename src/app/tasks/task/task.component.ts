import { Component, OnInit, ViewEncapsulation, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model';
@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent  {
  @Input() task: Task;
  @Output() outUpdateTask = new EventEmitter<Task>();

  @HostBinding('class.done')
  get done() {
    return this.task && this.task.done;
    // return this.task.done;
  }

  updateTask(done: boolean) {
    this.outUpdateTask.emit({
      ...this.task,
      done
    });
  }

  updateTitle(title: string) {
    this.outUpdateTask.emit({
      ...this.task,
      title
    });
  }
}
