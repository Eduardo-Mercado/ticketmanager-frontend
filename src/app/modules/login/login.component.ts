import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/security/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/security/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userRecord: User;
  loginForm: FormGroup;

  constructor(private service: UserService, private router: Router,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userRecord = new User();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
   });

  }

  public login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userRecord.userName = this.loginForm.controls.username.value;
    this.userRecord.passwd = this.loginForm.controls.password.value;

    this.service.signIn(this.userRecord).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['dashboard']);
    });
  }
}
