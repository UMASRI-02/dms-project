import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    console.log("Login clicked"); // 👈 DEBUG

    this.http.post<any>('http://localhost:5000/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        alert("Login success");
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert("Login failed");
        console.log(err);
      }
    });
  }
}