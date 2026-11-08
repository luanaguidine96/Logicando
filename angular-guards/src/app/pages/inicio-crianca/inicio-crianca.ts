import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-crianca',
  imports: [RouterLink],
  templateUrl: './inicio-crianca.html',
  styleUrl: './inicio-crianca.css'
})
export class InicioCrianca {

  nome = localStorage.getItem('nomeUsuario') ?? '';

  sair() {
    localStorage.removeItem('clienteLogado');
    localStorage.removeItem('nomeUsuario');
  }
}