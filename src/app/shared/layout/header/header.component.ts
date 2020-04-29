import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/security/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userInfo =  this.userService.getCurrentUser();
  }


}
