import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolComponent } from './rol/rol.component';


const routes: Routes = [{
   path: '',
   component: UsersComponent
},
{
  path: 'Rols',
  component: RolComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
