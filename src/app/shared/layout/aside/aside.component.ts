import { Component, OnInit } from '@angular/core';
import { OptionApp, Option } from 'src/app/core/models/security/menu.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/security/user.service';
import { RolService } from 'src/app/core/services/security/rol.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  public options: OptionApp[] = [];
  userInfo;
  constructor(private router: Router, private userService: UserService, private rolS: RolService) { }

  ngOnInit() {
    this.userInfo =  this.userService.getCurrentUser();
    this.GetOptions();
  }

  private GetOptions() {
    this.rolS.getoptionsByRol(this.userInfo.idRol).subscribe((data: OptionApp[]) => { this.options = data; });
  }

  public getItemSelected(id: number) {
    this.options.forEach(element => {
      element.nodes.forEach(item => {
        item.nameCssClass = 'sidebar-item';
      });
    });

    this.options.forEach(element => {
    //  const valor = element.nodes.filter( item => item.idOption === index);
    //  if (valor) {
    //     valor[0].nameCssClass = 'sidebar-item-active';
    //   }
    element.nodes.map( (obj: Option) => {
       if (obj.idOption === id) {
          obj.nameCssClass = 'sidebar-item-active';
       }
    });
    });

  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
