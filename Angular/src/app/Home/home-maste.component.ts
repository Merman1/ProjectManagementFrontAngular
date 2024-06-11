import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomePageInfo } from './home-info.model';
import { AuthService } from '../Services/AuthService';

@Component({
  selector: 'app-home-maste',
  templateUrl: './home-maste.component.html'
})
export class HomePageMasterComponent implements OnInit {
  userId: string | null = null; // Deklaruj zmienną userId
  selectedProjectId: number | null = null;
  selectedUser: any = {};
  searchQuery: string = '';
  showDropDown: boolean = false;
  showDropDown2: boolean = false;
  times: any[] = [];
  sprints: any[] = [];

  sprintTimes: any;
  homePageInfo: HomePageInfo;
  userData: any;

  showSide: boolean = false;
  showTimeFormFlag: boolean = false;
  selectedSprintId: number = 0;
  endTime: Date = new Date();
  startTime: Date = new Date();

  constructor(private route: ActivatedRoute,private http: HttpClient,private authService: AuthService) {
    this.homePageInfo = {
      times: [],
      showDropDown: false,
      sprintTimes: null,
      showDropDown2: false,
      showSide: false,
      sprints: [],
      startTime: '',
      endTime: '',
      userId: '',
      sprintId: '',
      userData: {
        id: '',
        email: '',
        username: '',
        password:'',
        publicName:'',
        firstName:'',
        lastName:'',
        positionName:'',
        address:'',
        number:'',
        location:'',
        organization:''
      },
      sprinter: {
        name: ''
      },
      selectedSprintId: null,
      showTimeFormFlag: false,
      searchQuery: '',
      selectedProject: ''
    };
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.paramMap.subscribe(params => {
      this.selectedProjectId = Number(params.get('selectedProjectId'));
      if (this.selectedProjectId) {
        console.log('Fetching data for selected project ID:', this.selectedProjectId);
        this.fetchData();
      } else {
        console.log('No project ID selected.');
      }
      console.log('selectedProjectId:', this.selectedProjectId);
    });
  }

  async fetchData() {
    try {
      console.log('Starting data fetch...');
      console.log('tak wyglada:', this.selectedProjectId);
  
      await Promise.all([
        this.fetchTimeData(),
        this.fetchProjectsData(),
        this.fetchSprintsData(),
        this.fetchUserData()
      ]);
  
      console.log('Fetched sprints:', this.homePageInfo.sprints);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async fetchTimeData() {
    try {
      const timeResponse = await this.http.get<any>('http://localhost:8000/api/auth/time').toPromise();
      this.homePageInfo.times = timeResponse.data;
    } catch (error) {
      console.error('Error fetching time data:', error);
    }
  }
  
  async fetchProjectsData() {
    try {
      const projectsResponse = await this.http.get<any>('http://localhost:8000/api/auth/projects').toPromise();
      this.homePageInfo.selectedProject = projectsResponse.data;
    } catch (error) {
      console.error('Error fetching projects data:', error);
    }
  }
  
  async fetchSprintsData() {
    try {
      const sprintsResponse = await this.http.get<any>('http://localhost:8000/api/auth/sprints').toPromise();
      console.log('Sprint response:', sprintsResponse);
      this.homePageInfo.sprints = sprintsResponse;
      console.log('Fetched sprints inside fetchSprintsData:', this.homePageInfo.sprints);
    } catch (error) {
      console.error('Error fetching sprints data:', error);
    }
  }
  
  
  
  
  async fetchUserData() {
    try {
      let userDataResponse;
      if (this.userId) {
        userDataResponse = await this.authService.getUserData();
        this.homePageInfo.userData = userDataResponse.data;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  
  async addTime() {
    if (this.selectedProjectId !== null) {
      console.log('User ID:', this.userData.id);
      console.log('Selected Sprint ID:', this.selectedSprintId);
      try {
        const time = {
          startTime: this.startTime,
          endTime: this.endTime,
          sprint: { id: this.selectedSprintId },
          user: { id: this.userData.id }
        };
        console.log('Payload:', JSON.stringify(time));

        const response = await this.http.post<any>('http://localhost:8000/api/auth/time', time).toPromise();

        console.log('Successfully added time:', response);
      } catch (error) {
        console.error('Error while adding time:', error);
      }
    }
  }
  updateUserId(event: any) {
    // Implementacja aktualizacji ID użytkownika
  }

  search() {
    // Implement search logic here
  }

  trackById(index: number, item: any): any {
    return item.id;
  }
  toggleSideBar() {
    this.homePageInfo.showSide = !this.homePageInfo.showSide;
  }

  toggleDrop() {
    this.homePageInfo.showDropDown = !this.homePageInfo.showDropDown;
  }

  toggleDrop2() {
    this.homePageInfo.showDropDown2 = !this.homePageInfo.showDropDown2;
  }
}
