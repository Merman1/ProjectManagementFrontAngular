import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Project } from '../Projects/project'; // Załóżmy, że masz model projektu

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
    selectedUser: any;
    sortedProjects: Project[] = [];
  showDropDown: boolean = false;
  showDropDown2: boolean = false;
  showSide: boolean = true;
  sprints: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  userData: any[] = [];
  selectedProject: string = '';
  searchQuery: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSprints();
    this.fetchProjects();
    this.fetchUserData();
  }

  async fetchUserData() {
    try {
      const response: any = await this.http.get('http://localhost:8000/api/auth/users').toPromise();
      if (response) {
        this.userData = response;
      } else {
        console.error('Pusty odpowiedź serwera');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych użytkownika:', error);
    }
  }
  
  

  fetchProjects(): void {
    this.http.get<Project[]>('http://localhost:8000/api/auth/projects').subscribe(projects => {
      // Zakładając, że masz właściwość sortedProjects, do której przypisujesz projekty
      this.sortedProjects = projects;
    });
  }

  fetchSprints(): void {
    this.http.get<any[]>('http://localhost:8000/api/auth/sprints').subscribe(sprints => {
      this.sprints = sprints;
      this.updateCalendarEvents();
    }, error => {
      console.error("Błąd podczas pobierania sprintów:", error);
    });
  }

  updateCalendarEvents() {
    this.calendarOptions.events = this.sprints.map(sprint => ({
      title: sprint.name,
      start: sprint.dataRozpoczecia,
      end: sprint.dataZakonczenia,
      color: this.getRandomColor(),
      extendedProps: {
        type: sprint.type
      }
    }));
  }
  search() {
    // Implementacja metody search
  }
  toggleSideBar() {
    this.showSide = !this.showSide;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  toggleDrop() {
    this.showDropDown = !this.showDropDown;
  }

  toggleDrop2() {
    this.showDropDown2 = !this.showDropDown2;
  }
}
