import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '..//Services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async submitLogin() {
    try {
      const response: any = await this.authService.login(this.username, this.password);

      if (response.accessToken) {
        await this.authService.storeUserData(response);
        const roles = response.roles;
        if (roles.includes('ROLE_USER') || roles.includes('ROLE_MODERATOR') || roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/projects']);
        } else {
          console.error('Nieznane role użytkownika');
        }
      } else {
        console.error('Logowanie nieudane');
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
      this.errorMessage = 'Błąd logowania, spróbuj ponownie.';
    }
  }
}
