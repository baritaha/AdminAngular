import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersRoutingModule } from '../../feature/users/users-routing.module';
import { SharedModule } from '../../feature/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { UsersModule } from '../../feature/users/users.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    UsersModule,
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    SharedModule,
  ],
  exports: [],
  providers: [],
})
export class DashboardModule {}
