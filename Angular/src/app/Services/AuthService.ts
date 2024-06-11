import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  async login(username: string, password: string): Promise<any> {
    try {
      const response = await this.http.post('http://localhost:8000/api/auth/signin', { username, password }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async storeUserData(userData: any): Promise<void> {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userId', userData.id); // Dodaj zapis ID użytkownika do localStorage
  }
    // Metoda do pobierania roli użytkownika z localStorage
    getUserRoles(): string[] {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        return user.roles;
      }
      return [];
    }
    getUserId(): string | null {
      return localStorage.getItem('userId'); // Pobierz ID użytkownika z localStorage
    }
    async getUserData(): Promise<any> {
      try {
        return await this.http.get('http://localhost:8000/api/auth/users').toPromise();
      } catch (error) {
        throw error;
      }
    }
  
  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      // Sprawdź, czy w localStorage jest zapisany użytkownik
      const userData = localStorage.getItem('userData');
      return userData !== null; // Zwróć true, jeśli użytkownik jest zalogowany, w przeciwnym razie false
    } else {
      console.error('localStorage is not available');
      return false;
    }
  }
  
}
