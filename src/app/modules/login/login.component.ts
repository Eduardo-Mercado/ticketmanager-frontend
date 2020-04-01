import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/security/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  public login() {
    this.service.signIn().subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['dashboard']);
    });
  }
}
