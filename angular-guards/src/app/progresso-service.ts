import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type EstadoFase = 'bloqueada' | 'liberada' | 'concluida';

export interface Fase {
  numero: number;
  estado: EstadoFase;
}



@Injectable({ providedIn: 'root' })
export class ProgressoService {

  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8081/progresso';

  fases = signal<Fase[]>(this.padrao());
  erro = signal('');

  faseAtual = computed(() => this.fases().find(f => f.estado === 'liberada')?.numero ?? null);
  totalConcluidas = computed(() => this.fases().filter(f => f.estado === 'concluida').length);
  total = computed(() => this.fases().length);
  percentual = computed(() => Math.round((this.totalConcluidas() / this.total()) * 100));

  private login(): string {
    return localStorage.getItem('loginUsuario') ?? '';
  }

  /** Usado pelas telas da criança */
  carregarCrianca() {
    this.buscar(`${this.API}/crianca/${encodeURIComponent(this.login())}`);
  }

  
carregarResponsavel() {
  const login = this.login();

  if (!login) {
    console.warn('Nenhum responsável está autenticado.');
    return;
  }

  this.http.get<any>(
    `http://localhost:8081/user/responsavel/${encodeURIComponent(login)}/criancas`
  ).subscribe({
    next: (criancas) => {
      console.log('Crianças encontradas:', criancas);
    },
    error: (erro) => {
      console.error('Erro ao buscar crianças:', erro);
    }
  });
}

  concluirFase(indice: number) {
    const lista = this.fases();
    if (lista[indice].estado === 'bloqueada') return;

    const nova = lista.map((fase, i): Fase => {
      if (i === indice) return { ...fase, estado: 'concluida' };
      if (i === indice + 1 && fase.estado === 'bloqueada') return { ...fase, estado: 'liberada' };
      return fase;
    });

    this.fases.set(nova);
    this.salvar(nova);
  }

  reiniciar() {
    const nova = this.padrao();
    this.fases.set(nova);
    this.salvar(nova);
  }

private buscar(url: string) {
  this.http.get<Fase[]>(url).subscribe({
    next: (resp) => {
      this.erro.set('');
      this.fases.set(resp?.length ? resp : this.padrao());
    },
    error: (erro) => {
      console.error('Erro ao buscar progresso:', erro);
      this.erro.set('Não foi possível carregar o progresso.');
    }
  });
}

  private salvar(fases: Fase[]) {
    this.http.put(
      `${this.API}/crianca/${encodeURIComponent(this.login())}`,
      fases 
    ).subscribe({
      next: () => this.erro.set(''),
      error: () => this.erro.set('Não foi possível salvar o progresso.')
    });
  }

  private padrao(): Fase[] {
    return Array.from({ length: 12 }, (_, i): Fase => ({
      numero: i + 1,
      estado: i === 0 ? 'liberada' : 'bloqueada'
    }));
  }
}