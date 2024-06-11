import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfoResponse, Role } from './user-info.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    newUser: any = { username: '', email: '', password: '', roles: 'user' };


    showDropDown: boolean = false;
    searchQuery: string = '';
    showSide: boolean = true;
    selectedProject: string = '';
    showDropDown2: boolean = false;
  users: UserInfoResponse[] = [];
  selectedUser: UserInfoResponse = {
    id: '',
    name:'',
    username: '',
    email: '',
    roles: [],
    role: '',  // Dodaj tę linię
    adress: '',
    lastName: '',
    firstName: '',
    positionName: '',
    location: '',
    number: '',
    organization: '',
    publicName: ''
  };
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.http.get<UserInfoResponse[]>('http://localhost:8000/api/auth/users')
      .subscribe(users => this.users = users);
  }
  search(): void {
    // Implementacja logiki wyszukiwania
  }
  addUser(): void {
    delete this.newUser.role;
    this.http.post<any>('http://localhost:8000/api/auth/signup', this.newUser)
      .subscribe(response => {
        console.log('Dodano użytkownika: ', response);
        
        // Jeśli chcesz zaimplementować odświeżanie listy użytkowników,
        // tutaj wywołaj metodę pobierającą listę użytkowników
        this.newUser = { username: '', email: '', password: '', roles: 'user' };

      }, error => {
        console.error('Błąd podczas dodawania użytkownika: ', error);
        console.log("dane:", this.newUser)
      });
  }
  updateUser(): void {
    this.http.put<any>('http://localhost:8000/api/auth/user/update', this.selectedUser)
      .subscribe(() => {
        // Handle success
        console.log('User updated successfully!');
      }, error => {
        // Handle error
        console.error('Error updating user:', error);
      });
  }
  toggleDropDown(): void {
    this.showDropDown = !this.showDropDown;
  }
  toggleDrop(): void {
    this.showDropDown = !this.showDropDown;
  }
  toggleDrop2(): void {
    this.showDropDown2 = !this.showDropDown2;
  }
  toggleSideBar(): void {
    this.showSide = !this.showSide; // Przełącz wartość zmiennej showSide
  }
}
