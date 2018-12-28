import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../model';
import {map} from 'rxjs/operators';

@Injectable()
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>('/api/tasks')
      .subscribe((tasks) => this.tasks.next(tasks));
  }

  getTasks() {
    return this.tasks.asObservable();
  }

  addTask(task: Task) {
    return this.http
      .post<Task>('/api/tasks', task)
      .subscribe(() => this.loadTasks());
  }

  updateTask(task: Task) {
    return this.http
      .post(`/api/tasks/${task.id}`, task)
      .subscribe(() => this.loadTasks());
  }

  getProjectTasks(projectId: number) {
    return this.tasks
      this.tasks
        .asObservable()
        .pipe(
          map((tasks) => tasks.filter((task) => task.projectId === projectId))
        );
  }
}
