import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type EstadoFase = 'bloqueada' | 'liberada' | 'concluida';

interface Fase {
  numero: number;
  estado: EstadoFase;
}

@Component({
  selector: 'app-mundo',
  imports: [RouterLink],
  templateUrl: './mundo.html',
  styleUrl: './mundo.css'
})
export class Mundo {

  // 12 fases: só a primeira começa liberada
  fases = signal<Fase[]>(
    Array.from({ length: 12 }, (_, i): Fase => ({
      numero: i + 1,
      estado: i === 0 ? 'liberada' : 'bloqueada'
    }))
  );

  clicarFase(indice: number) {
    const lista = this.fases();

    // impede o clique nas fases bloqueadas
    if (lista[indice].estado === 'bloqueada') {
      return;
    }

    this.fases.set(
      lista.map((fase, i): Fase => {
        // marca a fase clicada como concluída
        if (i === indice) {
          return { ...fase, estado: 'concluida' };
        }
        // libera a próxima, se ela ainda estiver bloqueada
        if (i === indice + 1 && fase.estado === 'bloqueada') {
          return { ...fase, estado: 'liberada' };
        }
        return fase;
      })
    );
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
  }
}