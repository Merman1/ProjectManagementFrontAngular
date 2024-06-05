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
    // Tutaj zapisz dane użytkownika, na przykład w localStorage lub w serwisie do przechowywania danych
  }
}
