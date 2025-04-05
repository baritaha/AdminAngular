import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteUser, getUsers } from '../../database/users';
import User from '../../models/user.model';
import { showToast } from '../../../../utils/show-toast';
import { LOGGER_TOKEN } from '../../toekn/logger.token';
import Logger from '../../../../models/logger.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = []; // All users
  pagedUsers: User[] = []; // Users for the current page
  loading: boolean = true;
  pages: number[] = []; // Page numbers
  page: number = 1; // Current page
  itemsPerPage: number = 3; // Default items per page
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject('ADMIN_USER_ID') private userAdminId: number,
    @Inject(LOGGER_TOKEN) private logger: Logger
  ) {}

  ngOnInit(): void {
   // console.log('id test for Inject is ' + this.userAdminId);
    const UrlApi = environment.DEFAULT_LOGGER;
    if (UrlApi === 'console') {
      this.logger.log(
        'User list component initialized from "Console Logger" token intrface'
      );
      this.logger.logError(
        'text error come from the "Console logger" interface token'
      );
    } else {
      this.logger.log(
        'User list component initialized from "File Logger" token intrface'
      );
      this.logger.logError(
        'text error come from the "File logger" interface token'
      );
    }

    // Fetch all users
    getUsers()
      .then((users: User[]) => {
        this.users = users;
        this.loading = false;
        const userLocal = {
          id: localStorage.getItem('id'),
          name: localStorage.getItem('name'),
          email: localStorage.getItem('email'),
        };

        // Subscribe to query parameters
        this.route.queryParams.subscribe((params) => {
          this.page = +params['page'] || 1; // Default to page 1
          this.itemsPerPage = +params['itemsPerPage'] || 3; // Default items per page
          this.setupPagination();
        });
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        this.loading = true;
      });
  }

  setupPagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // Load the current page
    this.loadPage(this.page);
  }

  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.page = page; // Update the current page
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedUsers = this.users.slice(startIndex, endIndex);

    // Update query parameters in the URL
    this.router.navigate([], {
      queryParams: { page: this.page, itemsPerPage: this.itemsPerPage },
      queryParamsHandling: 'merge', // Keep existing query parameters
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.loadPage(this.page - 1);
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.loadPage(this.page + 1);
    }
  }
  //async promise
  // deleteUser(user: User): void {
  //   //  this.loading = true; // Optional: show loading state
  //   deleteUser(user)
  //     .then(() => {
  //       // Remove user from the local list
  //       this.users = this.users.filter((u) => u.id !== user.id);
  //       this.setupPagination(); // Update pagination after deletion
  //       var text = `<strong class="bg-danger text-white p-3"> <em class="text-primary">${user.name} </em> deleted successfully</strong>`;
  //       showToast(text, 'success'); // Notify the user (if you have a toast utility)
  //       this.loading = false;
  //     })
  //     .catch((err) => {
  //       console.error('Error deleting user:', err);
  //       showToast('Failed to delete user', 'error'); // Notify the user of the error
  //       this.loading = false;
  //     });
  // }
  //conver from async to sync
  async deleteUser(user: User): Promise<void> {
    try {
      await deleteUser(user);
      // Remove user from the local list
      this.users = this.users.filter((u) => u.id !== user.id);
      this.setupPagination(); // Update pagination after deletion
      var text = `<strong class="bg-danger text-white p-3"> <em class="text-primary">${user.name} </em> deleted successfully</strong>`;
      showToast(text, 'success'); // Notify the user (if you have a toast utility)
      this.loading = false;
    } catch (err) {
      console.error('Error deleting user:', err);
      showToast('Failed to delete user', 'error'); // Notify the user of the error
      this.loading = false;
    }
  }
}
