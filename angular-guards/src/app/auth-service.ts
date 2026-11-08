import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RespostaLogin {
  mensagem: string;
  tipo: string;
}

export interface DadosCadastro {
  name: string;
  email: string;
  login: string;
  senha: string;
  loginCrianca: string;
  senhaCrianca: string;
}

interface RespostaCadastro {
  mensagem: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(login: string, senha: string, tipo: string): Observable<RespostaLogin> {
    return this.http.post<RespostaLogin>(
      'http://localhost:8081/login',
      { login, senha, tipo }
    );
  }

  cadastrar(dados: DadosCadastro): Observable<RespostaCadastro> {
    return this.http.post<RespostaCadastro>(
      'http://localhost:8081/user',
      dados
    );
  }
}