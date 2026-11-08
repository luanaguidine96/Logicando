import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-responsavel',
  imports: [RouterLink],
  templateUrl: './inicio-responsavel.html',
  styleUrl: './inicio-responsavel.css'
})
export class InicioResponsavel {

  sair() {
    localStorage.removeItem('clienteLogado');
  }
}