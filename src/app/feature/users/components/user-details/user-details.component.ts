import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUser } from '../../database/users';
import User from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  id: string | null = '';
  success: boolean = false;
  failed: boolean = false;
  error: string = '';
  loading: boolean = false;
  user!: User;
  constructor(private route: ActivatedRoute) {}
  // ngOnInit(): void {
  //   this.id = this.route.snapshot.paramMap.get('id');
  //   if (this.id) {
  //     this.loading = true;
  //     getUser(this.id)
  //       .then((user: User) => {
  //         this.loading = false;
  //         this.user = user;
  //       })
  //       .catch((error: string) => {
  //         this.error = error;
  //         this.loading = false;
  //       });
  //   } else {
  //     this.error = 'User Id Not Found';
  //   }
  // }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      try {
        this.loading = true;
        this.user = await getUser(this.id);
        this.loading = false;
      } catch (error) {
        this.error = error as string;
        this.loading = false;
      }
    } else {
      this.error = 'User Id Not Found';
    }
  }
}
