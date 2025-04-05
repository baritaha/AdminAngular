import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './feature/components/auth-layout/auth-layout.component';
import { HeaderLayoutComponent } from './feature/components/header-layout/header-layout.component';
import { FooterLayoutComponent } from './feature/components/footer-layout/footer-layout.component';
import { SharedModule } from './feature/shared/shared.module';
import { UsersModule } from './feature/users/users.module';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    SharedModule
  ],
  exports:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{



 }
