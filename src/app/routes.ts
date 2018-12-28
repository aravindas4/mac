import {Route} from '@angular/router';
import {ProjectContainerComponent} from './container/project-container/project-container.component';

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
  redirectTo: '/projects/1'
}];
