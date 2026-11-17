import { Injectable, signal, computed, effect } from '@angular/core';

export type EstadoFase = 'bloqueada' | 'liberada' | 'concluida';

export interface Fase {
  numero: number;
  estado: EstadoFase;
}

@Injectable({ providedIn: 'root' })
export class ProgressoService {

  private readonly CHAVE = 'progressoFases';

  fases = signal<Fase[]>(this.carregar());

  // fase em que a criança está agora (a "liberada"); null se terminou tudo
  faseAtual = computed(() => this.fases().find(f => f.estado === 'liberada')?.numero ?? null);
  totalConcluidas = computed(() => this.fases().filter(f => f.estado === 'concluida').length);
  total = computed(() => this.fases().length);

  constructor() {
    // salva sempre que o progresso mudar
    effect(() => localStorage.setItem(this.CHAVE, JSON.stringify(this.fases())));

    // atualiza se outra aba do navegador alterar o progresso
    window.addEventListener('storage', (e) => {
      if (e.key === this.CHAVE) this.fases.set(this.carregar());
    });
  }

  concluirFase(indice: number) {
    const lista = this.fases();
    if (lista[indice].estado === 'bloqueada') return;

    this.fases.set(
      lista.map((fase, i): Fase => {
        if (i === indice) return { ...fase, estado: 'concluida' };
        if (i === indice + 1 && fase.estado === 'bloqueada') return { ...fase, estado: 'liberada' };
        return fase;
      })
    );
  }
// junto dos outros computed
percentual = computed(() =>
  Math.round((this.totalConcluidas() / this.total()) * 100)
);

// junto dos outros métodos
reiniciar() {
  this.fases.set(
    Array.from({ length: 12 }, (_, i): Fase => ({
      numero: i + 1,
      estado: i === 0 ? 'liberada' : 'bloqueada'
    }))
  );
}
  private carregar(): Fase[] {
    try {
      const salvo = localStorage.getItem(this.CHAVE);
      if (salvo) return JSON.parse(salvo);
    } catch {}
    return Array.from({ length: 12 }, (_, i): Fase => ({
      numero: i + 1,
      estado: i === 0 ? 'liberada' : 'bloqueada'
    }));
  }
}