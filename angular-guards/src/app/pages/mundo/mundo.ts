import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fase, ProgressoService } from '../../progresso-service';

@Component({
  selector: 'app-mundo',
  imports: [RouterLink],
  templateUrl: './mundo.html',
  styleUrl: './mundo.css'
})
export class Mundo implements OnInit {

  private progresso = inject(ProgressoService);
  fases = this.progresso.fases;

  ngOnInit() {
    this.progresso.carregarCrianca();
  }

  clicarFase(indice: number) {
    this.progresso.concluirFase(indice);
  }

  imagem(fase: Fase): string {
    if (fase.estado === 'liberada') return '/img/jogue-me.png';
    if (fase.estado === 'concluida') return '/img/feito.png';
    return `/img/fase${fase.numero}.png`;
  }

  descricao(fase: Fase): string {
    if (fase.estado === 'liberada') return `Jogar fase ${fase.numero}`;
    if (fase.estado === 'concluida') return 'Fase concluída';
    return `Fase ${fase.numero}`;
  }

  sair() {
    localStorage.removeItem('clienteLogado');
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('loginUsuario');
  }
}