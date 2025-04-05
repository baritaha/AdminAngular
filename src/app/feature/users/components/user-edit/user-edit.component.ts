import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';
import { editUser, getUsers, users } from '../../database/users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  error: string[] = [];
  loading = 'Loading...';
  success: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    getUsers().then(() => {
      const user = users.find((u) => (u.id = this.id));
      if (user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
      } else {
        this.error.push('User not found');
      }
    });
  }
  saveChangeClick():void {
    this.success = false;
    this.error = [];

    if (this.email.trim() && this.password.trim() && this.name.trim()) {
      // Clear errors and set loading message
      this.error = [];
      this.loading = 'Loading...';
      this.success=true;

      // Add user to database
      const user: User = {
        id: this.id,
        name: this.name.trim(),
        email: this.email.trim(),
        password: this.password.trim(),
        role: 'user',
      };
      console.log(user);

      editUser(user)
        .then(() => {
          this.success = true;
          this.router.navigate([`/edit${this.id}`]); // Navigate to the list page
        })
        .catch((err) => {
          console.error('Error adding user:', err);
          this.error.push('Failed to add user. Please try again.');
        });
    } else {
      // Validate form inputs
      if (!this.name.trim()) this.error.push('Username invalid');
      if (!this.password.trim()) this.error.push('Password invalid');
      if (!this.email.trim()) this.error.push('Email invalid');
    }
  }
}
