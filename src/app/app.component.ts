import { Component, ViewEncapsulation } from '@angular/core';
import {map} from 'rxjs/operators';
import {UserService} from './user/user.service';
import {Project, Task, User} from './model';
import {Observable} from 'rxjs';
import {TaskService} from './tasks/task.service';
import {ProjectService} from './project/project.service';

@Component({
  selector: 'mac-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  openTasksCount: Observable<number>;
  user: Observable<User>;
  projects: Observable<Project[]>;
  // selectedProject: Observable<Project>;
  title = 'mac';

  constructor(taskListService: TaskService,
              userService: UserService,
              private projectService: ProjectService) {
    this.openTasksCount = taskListService.getTasks()
      .pipe(
        map((tasks: Task[]) => {
          return tasks
            .filter((task) => !task.done)
            .length;
        })
      );
    this.projects = projectService.getProjects();
    // this.selectedProject = projectService.getSelectedProject();
    this.user = userService.getCurrentUser();
  }

  // selectProject(id: number) {
  //   this.projectService.selectProject(id);
  // }
}
