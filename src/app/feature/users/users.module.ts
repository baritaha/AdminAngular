import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { PasswordMaskPipe } from '../../pipes/password-mask.pipe';
import { SharedModule } from '../shared/shared.module';
import { ConsoleLoggerService } from './services/console-logger.service';
import { LOGGER_TOKEN } from './toekn/logger.token';
import { FileLoggerService } from './services/file-logger.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

const userLogin = () => {
  //const loggerType= localStorage.getItem('loggerType');
  const loggerType = environment.DEFAULT_LOGGER;
  console.log('looger type is ', loggerType);
  if (loggerType === 'console') {
    return new ConsoleLoggerService();
  } else {
    return new FileLoggerService();
  }
};

@NgModule({
  declarations: [
    UserDetailsComponent,
    UserFormComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [CommonModule, FormsModule, UsersRoutingModule, SharedModule,RouterModule],
  exports: [UserListComponent],
  providers: [
    { provide: 'ADMIN_USER_ID', useValue: 9 },
   // { provide: LOGGER_TOKEN, useClass: ConsoleLoggerService },
   //{ provide: LOGGER_TOKEN, useClass: FileLoggerService },
    { provide: LOGGER_TOKEN, useFactory: userLogin },
  ],
})
export class UsersModule {}
