import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { userTypeGuard } from '../../guards/user-type.guard';

const routes: Routes = [
  {
    path:'',
    component: UserListComponent
  },
  {
    path:'list',
    component: UserListComponent,
 
  },
  {
    path:'add',
    component: UserFormComponent,
    canActivate:[userTypeGuard]
  },
  {
    path:'edit/:id',
    component: UserFormComponent,
    canActivate:[userTypeGuard]
  },
  {
    path:'details/:id',
    component: UserDetailsComponent,
    canActivate:[userTypeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
