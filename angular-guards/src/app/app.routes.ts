import { Routes } from '@angular/router';
import { Duvidas } from './pages/duvidas/duvidas';
import { Sobre } from './pages/sobre/sobre';
import { InicioResponsavel } from './pages/inicio-responsavel/inicio-responsavel';



import { Home } from './pages/home/home';
import { LoginCrianca } from './pages/login-crianca/login-crianca';
import { LoginResponsavel } from './pages/login-responsavel/login-responsavel';
import { Mundo } from './pages/mundo/mundo';
import { Acompanhamento } from './pages/acompanhamento/acompanhamento';
import { Privado } from './pages/privado/privado';


import { authGuard } from './auth-guard';
import { InicioCrianca } from './pages/inicio-crianca/inicio-crianca';
import { CadastroResponsavel } from './pages/cadastro-responsavel/cadastro-responsavel';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login-crianca', component: LoginCrianca },
  { path: 'login-responsavel', component: LoginResponsavel },
{ path: 'duvidas', component: Duvidas },
  { path: 'cadastro-responsavel', component: CadastroResponsavel },
{ path: 'sobre', component: Sobre },
{ path: 'inicio-crianca', component: InicioCrianca, canActivate: [authGuard] },
{ path: 'inicio-responsavel', component: InicioResponsavel, canActivate: [authGuard] },
  { path: 'mundo', component: Mundo, canActivate: [authGuard] },
  { path: 'acompanhamento', component: Acompanhamento, canActivate: [authGuard] },
  { path: 'privado', component: Privado, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];