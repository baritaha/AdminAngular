import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import User from '../../models/user.model';
import { addUsers, getUser, updateUser, users } from '../../database/users';
import { showToast } from '../../../../utils/show-toast';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  id: string | null = null;
  name: string = '';
  email: string = '';
  password: string = '';
  role:string='user';
  error: string[] = [];
  loading = 'saving...';
  success: boolean = false;
  changing: boolean = false;
  changed:string='';
  user!:User;
  constructor(private router: Router, private route: ActivatedRoute) {}
  //use async promise
  // ngOnInit(): void {
  //   this.id = this.route.snapshot.paramMap.get('id');
  //   //get data in html page
  //   if (this.id) {
  //     this.success=true;
  //     this.loading='Getting User Data ...'
  //     getUser(this.id).then((user: User) => {
  //       this.name=user.name;
  //       this.email=user.email;
  //       this.password=user.password;
  //       this.success=false;
  //       this.loading='';
  //     })
  //     .catch(()=>{
  //       this.error.push('Id Not Exist');
  //       this.success=false;
  //     })
  //   }
  // }
  //use async await
async  ngOnInit():Promise <void> {
    this.id = this.route.snapshot.paramMap.get('id');
    //get data in html page
    if (this.id) {
       this.success=true;
      this.loading='Getting User Data ...';

      try {
        this.user= await getUser(this.id);
            this.name=this.user.name;
        this.email=this.user.email;
        this.password=this.user.password;
        this.success=false;
        this.loading='';
      } catch (error) {
        this.error.push('Id Not Exist');
        this.success=false;
      }



    }
  }

  saveBtnClick() {
    this.error = [];

    if (this.email && this.password && this.name) {
      // Clear errors and set loading message

      // Add user to database
      let user: User = {
        //id: '', // Placeholder for ID (generated in addUsers)
        name: this.name.trim(),
        email: this.email.trim(),
        password: this.password.trim(),
        role: this.role.trim(),
      };
      if (this.id) {
        this.error = [];
        this.success = true;
        this.loading = 'Updating User Data ...'
        // Update existing user
        user.id = this.id;
        updateUser(user)
          .then(() => {
            this.success = false;
            this.changing=true;
            this.changed = 'data updated successfully...';
            setTimeout(()=>{
              this.router.navigate(['/users/list']); // Navigate to the list page
            },2000)
          })
          .catch((error) => {
            this.error.push('Error updating user: ' + error.message);
            this.success = false;

          });
      } else {
        this.success = true;
        this.loading="Saving Data ...";
        let username = `<strong class="text-white p-2 fw-bold">${user.name}</strong>`;

        // Call showToast with the message

        addUsers(user)
          .then((user: User) => {
            this.success = false;
            showToast(`${username}   Added successfully`, 'green');
            setTimeout(() => {
              this.router.navigate(['/users/list']); // Navigate to the list page
            }, 2000);

          })
          .catch((err) => {
            console.error('Error adding user:', err);
            this.error.push('Failed to add user. Please try again.');
            this.success=false;
          });
      }
    } else {
      // Validate form inputs
      if (!this.name.trim()) this.error.push('Username invalid');
      if (!this.password.trim()) this.error.push('Password invalid');
      if (!this.email.trim()) this.error.push('Email invalid');
      this.success = false;
    }
  }
}
