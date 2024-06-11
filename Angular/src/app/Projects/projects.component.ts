import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Project } from './project';
import { Router } from '@angular/router';
export interface UserInfoResponse {
    id: number;
    username: string;
    email: string;
    roles: Role[]; // Zmieniamy role na tablicę obiektów Role
  }
  
  export interface Role {
    id: number;
    name: string;
  }
 export interface UserData {
    roles: Role[];
        username: string;
        // Inne właściwości
      
    // inne właściwości, jeśli istnieją
  }
  
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  @Output() projectSelected: EventEmitter<number> = new EventEmitter<number>();
    userData: UserData | null = null;
    homeLink: string = '/homePageMaster'; 
    showOptions: { [projectId: number]: boolean } = {}; 
    searchQuery: string = '';
    selectedProject: string = '';
    showDropDown2: boolean = false;
  showSide: boolean = true;
  showBacklogLink: boolean = true;
  showListLink: boolean = true;
  showUsersLink: boolean = true;
  showSettingsLink: boolean = true;
  sortedProjects: Project[] = [];
  showDropDown: boolean = false; // Dodaj właściwość showDropDown

  constructor(private http: HttpClient,private router: Router) { } // Inject HttpClient

  ngOnInit(): void {
    this.fetchProjects();
    if (this.userData && this.userData.roles) {
        if (this.userData.roles.some((role: Role) => role.name === 'ROLE_ADMIN')) {
          this.homeLink = '/homePageMaster';
        } else if (this.userData.roles.some((role: Role) => role.name === 'ROLE_USER')) {
          this.homeLink = '/homePageUser';
        }
      }
      
  }

  selectProject(id: number): void {
    this.router.navigate(['/homePageMaster', { selectedProjectId: id }]);
    console.log('Selected project with id:', id);
  }

  fetchProjects(): void {
    this.http.get<Project[]>('http://localhost:8000/api/auth/projects').subscribe(projects => {
      this.sortedProjects = projects;
    });
  }


  toggleOptions(projectId: number): void {
    console.log('Toggled options for project with id:', projectId);
  }

  deleteProject(projectId: number): void {
    console.log('Deleted project with id:', projectId);
    this.http.delete(`/api/auth/projects/${projectId}`).subscribe(() => {
      this.sortedProjects = this.sortedProjects.filter(project => project.id !== projectId);
    });
  }

  openEditProjectDialog(project: Project): void {
    console.log('Opened edit project dialog for project:', project);
  }

  toggleSideBar(): void {
    this.showSide = !this.showSide;
  }

  isAdmin(): boolean {
    return true;
  }

  addProject(): void {
    console.log('Adding a new project');
  }

  generateColor(projectId: number): string {
    const colors = ['#fca5a5', '#fcd34d', '#4ade80', '#c084fc', '#38bdf8', '#4ade80'];
    return colors[projectId % colors.length];
  }

  search(): void {
    // Implement search logic here
  }

  toggleDrop(): void {
    console.log('Toggled user profile dropdown');
  }

  toggleDrop2(): void {
    console.log('Toggled notifications dropdown');
  }
  toggleDropDown() {
    this.showDropDown = !this.showDropDown; // Metoda do przełączania wartości showDropDown
  }
}
