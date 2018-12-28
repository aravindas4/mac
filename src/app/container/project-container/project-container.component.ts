import {Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project, Tab} from '../../model';
import {ProjectService} from '../../project/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'mac-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css'],
  encapsulation: ViewEncapsulation.None,
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent {
  selectedProject: Observable<Project>;
  tabs: Tab[] = [
    {id: 'tasks', title: 'Tasks'},
    {id: 'comments', title: 'Comments'},
    {id: 'activities', title: 'Activities'}
  ];
  activeTab: Observable<Tab>;

  activateTab(tab: Tab) {
    this.activeTab = tab;
  }

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router) {
    this.selectedProject = combineLatest(
      projectService.getProjects(),
      route.params
    ).pipe(
      map(([projects, routeParams]) =>
        projects.find((project) => project.id === +routeParams.projectId)
      )
    );

    this.activeTab = combineLatest(
      this.selectedProject,
      route.url
    ).pipe(
      map(([project]) =>
        this.tabs.find((tab) =>
          router.isActive(
            `/projects/${project.id}/${tab.id}`,
            false
          )
        )
      )
    );
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project);
  }


}
