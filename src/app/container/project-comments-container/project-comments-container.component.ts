import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {ProjectService} from '../../project/project.service';
import {UserService} from '../../user/user.service';
import {Observable} from 'rxjs';
import {Comment, CommentUpdate, Project, User} from '../../model';
import {map, take} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mac-project-comments-container',
  templateUrl: './project-comments-container.component.html',
  styleUrls: ['./project-comments-container.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCommentsContainerComponent {
  user: Observable<User>;
  selectedProject: Observable<Project>;
  projectComments: Observable<Comment[]>;

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.user = userService.getCurrentUser();
    this.selectedProject = projectService.getSelectedProject();
    this.projectComments = this.selectedProject
      .pipe(
        map((project) => project.comments)
      );
  }

  createComment(comment: Comment) {
    this.selectedProject
      .pipe(
        take(1)
      )
      .subscribe((project) => this.projectService.updateProject({
        ...project,
        comments: [...project.comments, comment]
      }));
  }

  updatecomment(update: CommentUpdate) {
    this.selectedProject
      .pipe(
        take(1)
      )
      .subscribe((project) => {
        const updatedComments = project.comments.slice();
        updatedComments[update.index] = update.comment;
        this.projectService.updateProject({
          ...project,
          comments: updatedComments
        });
      });
  }
}

/*
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
*/
