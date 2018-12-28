import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Project} from '../model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProjectService {

  private projects = new BehaviorSubject<Project[]>([]);
  private selectedProjectId = new BehaviorSubject<number>(1);
  private selectedProject: Observable<Project>;

  constructor(private http: HttpClient) {
    this.loadProjects();
    this.selectedProject = combineLatest(this.projects, this.selectedProjectId)
      .pipe(
        map(([projects, selectedProjectId]) =>
            projects.find((project) => project.id === selectedProjectId)
            )
      );
  }

  private loadProjects() {
    this.http.get<Project[]>('/api/projects')
      .subscribe((projects) => this.projects.next(projects));
  }

  selectProject(id: number) {
    this.selectedProjectId.next(id);
  }

  getSelectedProject() {
    return this.selectedProject;
  }

  getProjects() {
    return this.projects.asObservable();
  }

  updateProject(project: Project) {
    this.http.post(`/api/projects/${project.id}`, project)
      .subscribe(() => this.loadProjects());
  }
}
