import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-crianca',
imports: [FormsModule, RouterLink],
  templateUrl: './login-crianca.html',
  styleUrl: './login-crianca.css'
})
export class LoginCrianca {

  private authService = inject(AuthService);
  private router = inject(Router);

  login = '';
  senha = '';
  mensagem = '';

 entrar() {

  this.mensagem = 'Verificando login...';

  this.authService.login(this.login, this.senha, 'CRIANCA')
    .subscribe({

      next: (resposta) => {

        localStorage.setItem('clienteLogado', 'CRIANCA');

        this.router.navigate(['/mundo']);

      },

      error: (erro) => {

        this.mensagem =
          erro.error?.mensagem || 'Não foi possível conectar ao servidor.';

      }

    });

}
}