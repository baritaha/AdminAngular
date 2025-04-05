import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {loginUser} from '../database/users';
import { showToast } from '../../../utils/show-toast';
import User from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private router:Router) { }
//ssend name and password to recieve it by state.root.queryParams in onother pages or components 

  //login used inside loginComponent
  name: string = '';
  password: string = '';
  error = '';
  loading = '';
  success: boolean = false;
  login() {
    if (this.name.trim() && this.password.trim()) {
      this.success = true;
      this.loading = 'cheking data  ...';
      this.error = '';
      loginUser(this.name, this.password)
        .then((user: User) => {
          this.success = true;
          this.loading = 'logging user ...';
          localStorage.setItem('email',JSON.stringify(user.email));
          localStorage.setItem('name',JSON.stringify(user.name));
          localStorage.setItem('id',JSON.stringify(user.id));
          localStorage.setItem('role',JSON.stringify(user.role));

          showToast('Welcome ' + user.name, 'green');
          setTimeout(() => {
            this.router.navigate(['/users/list']);
          }, 3000);
        })
        .catch((error) => {
          this.success = false;
          this.error = error;
        });
    } else {
      this.error = 'username or password invalid';
      this.success = false;
    }
  }




}
