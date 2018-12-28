import {Route} from '@angular/router';
import {ProjectContainerComponent} from './container/project-container/project-container.component';
import {TaskListContainerComponent} from './container/task-list-container/task-list-container.component';
import {ProjectCommentsContainerComponent} from './container/project-comments-container/project-comments-container.component';
export const routes: Route[] = [{
  path: 'projects/:projectId',
  component: ProjectContainerComponent,
  children: [{
    path: 'tasks',
    component: TaskListContainerComponent
  },{
    path: 'comments',
    component: ProjectCommentsContainerComponent
  }, {
    path: '**',
    redirectTo: 'tasks'
  }]
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: '/projects/1/tasks'
}];
