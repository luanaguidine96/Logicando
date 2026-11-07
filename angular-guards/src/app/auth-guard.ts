import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const usuario = localStorage.getItem('clienteLogado');

  if (usuario) {
    return true;
  }

  return router.createUrlTree(['/home']);
};