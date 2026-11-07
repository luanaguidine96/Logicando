import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RespostaLogin {
  mensagem: string;
  tipo: string;
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
}