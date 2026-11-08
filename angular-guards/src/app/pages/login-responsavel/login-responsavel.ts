import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-login-responsavel',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-responsavel.html',
  styleUrl: './login-responsavel.css'
})
export class LoginResponsavel {

  private authService = inject(AuthService);
  private router = inject(Router);

  login = '';
  senha = '';
  mensagem = signal('');

  entrar() {
    this.mensagem.set('Verificando login...');

    this.authService.login(this.login, this.senha, 'RESPONSAVEL')
      .subscribe({
        next: () => {
          localStorage.setItem('clienteLogado', 'RESPONSAVEL');
          this.router.navigate(['/acompanhamento']);
        },
        error: (erro) => {
          this.mensagem.set(
            erro.error?.mensagem || 'Não foi possível conectar ao servidor.'
          );
        }
      });
  }
}