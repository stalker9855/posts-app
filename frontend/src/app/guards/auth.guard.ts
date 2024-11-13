import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    if (state.url === '/login' || state.url === '/register') {
      router.navigate(['/main']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
