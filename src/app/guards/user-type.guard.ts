import { CanActivateFn, Router } from '@angular/router';
import { users } from '../feature/users/database/users';
import { showToast } from '../utils/show-toast';
import { inject } from '@angular/core';


export const userTypeGuard: CanActivateFn = (route, state) => {
 const router=inject(Router);
  const userId = JSON.parse(localStorage.getItem('id')||'');
  const user = users.find((u) => u.id ===  userId);
  console.log(userId,user?.name,user?.role);
  if (user && user.role === 'admin') {
    return true;
  } else {
    showToast('You are not authorized to access this page', 'red');
    setTimeout(() => {
   router.navigate(['login']);
    }
    , 3000);
localStorage.clear();
    return false;
  }
};