import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
  selectedProjectId: number | null = null;

  onProjectSelected(projectId: number): void {
    this.selectedProjectId = projectId;
    console.log('Selected project ID:', this.selectedProjectId);
  }
}
