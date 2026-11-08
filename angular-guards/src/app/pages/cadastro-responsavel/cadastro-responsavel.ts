import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-cadastro-responsavel',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-responsavel.html',
  styleUrl: './cadastro-responsavel.css'
})
export class CadastroResponsavel {

  private authService = inject(AuthService);

  nome = signal('');
  email = signal('');
  login = signal('');
  senha = signal('');
  loginCrianca = signal('');
  senhaCrianca = signal('');
  mensagem = signal('');

  cadastrar() {
    const dados = {
      name: this.nome(),
      email: this.email(),
      login: this.login(),
      senha: this.senha(),
      loginCrianca: this.loginCrianca(),
      senhaCrianca: this.senhaCrianca()
    };

    if (Object.values(dados).some(valor => !valor.trim())) {
      this.mensagem.set('Preencha todos os campos.');
      return;
    }

    this.mensagem.set('Realizando cadastro...');

    this.authService.cadastrar(dados).subscribe({
      next: (resposta) => {
        this.mensagem.set(resposta.mensagem);
        this.limpar();
      },
      error: (erro) => {
        this.mensagem.set(
          erro.status === 0
            ? 'Não foi possível conectar ao servidor.'
            : 'Erro ao cadastrar: ' + (erro.error?.mensagem ?? 'confira os dados.')
        );
      }
    });
  }

  private limpar() {
    this.nome.set('');
    this.email.set('');
    this.login.set('');
    this.senha.set('');
    this.loginCrianca.set('');
    this.senhaCrianca.set('');
  }
}