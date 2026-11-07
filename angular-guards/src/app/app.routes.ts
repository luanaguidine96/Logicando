import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { LoginCrianca } from './pages/login-crianca/login-crianca';
import { LoginResponsavel } from './pages/login-responsavel/login-responsavel';
import { Mundo } from './pages/mundo/mundo';
import { Acompanhamento } from './pages/acompanhamento/acompanhamento';
import { Privado } from './pages/privado/privado';

import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login-crianca', component: LoginCrianca },
  { path: 'login-responsavel', component: LoginResponsavel },

  { path: 'mundo', component: Mundo, canActivate: [authGuard] },
  { path: 'acompanhamento', component: Acompanhamento, canActivate: [authGuard] },
  { path: 'privado', component: Privado, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];