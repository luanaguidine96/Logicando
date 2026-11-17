import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressoService } from '../../progresso-service';

@Component({
  selector: 'app-inicio-crianca',
  imports: [RouterLink],
  templateUrl: './inicio-crianca.html',
  styleUrl: './inicio-crianca.css'
})
export class InicioCrianca implements OnInit {

  progresso = inject(ProgressoService);
  nome = localStorage.getItem('nomeUsuario') ?? '';

  etapaReinicio = signal<0 | 1 | 2>(0);

  ngOnInit() {
    this.progresso.carregarCrianca();
  }

  pedirReinicio()    { this.etapaReinicio.set(1); }
  avancarReinicio()  { this.etapaReinicio.set(2); }
  cancelarReinicio() { this.etapaReinicio.set(0); }

  confirmarReinicio() {
    this.progresso.reiniciar();
    this.etapaReinicio.set(0);
  }

  sair() {
    localStorage.removeItem('clienteLogado');
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('loginUsuario');
  }
}