import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordMaskPipe } from '../../pipes/password-mask.pipe';
import { AuthService } from '../users/services/auth.service';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [PasswordMaskPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [PasswordMaskPipe],
//define authService inside provider:
providers: [
 {provide: 'AuthService', useClass: AuthService}
]

})
export class SharedModule { }
