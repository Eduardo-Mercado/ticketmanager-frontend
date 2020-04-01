import { Component, OnInit } from '@angular/core';
import { OptionApp } from 'src/app/core/models/security/menu.model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  public options: OptionApp[] = [];

  constructor() { }

  ngOnInit() {
    this.GetOptions();
  }

  private GetOptions() {
    this.options.push( new OptionApp(1, 'all Tickets', '/ticket', 'home'));
    this.options.push( new OptionApp(1, 'My Tickets', '/ticket/view', 'home'));
    this.options.push( new OptionApp(2, 'Dashboard', '/dashboard', 'dashboard'));
    this.options.push( new OptionApp(3, 'Company', '/catalog', 'business'));
    this.options.push( new OptionApp(4, 'Agent', '/catalog/agent', 'perm_identity'));
    this.options.push( new OptionApp(5, 'Customer', '/catalog/customer', 'people'));
    this.options.push( new OptionApp(5, 'Users', '/security', 'people'));
  }

  public getItemSelected(index: number) {
    this.options.forEach(element => {
      element.nameCssClass = 'sidebar-item';
    });

    this.options[index].nameCssClass = 'sidebar-item-active';
  }

}
