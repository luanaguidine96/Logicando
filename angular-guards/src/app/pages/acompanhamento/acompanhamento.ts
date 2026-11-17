import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';
import { ProgressoService } from '../../progresso-service';

@Component({
  selector: 'app-acompanhamento',
  imports: [RouterLink],
  templateUrl: './acompanhamento.html',
  styleUrl: './acompanhamento.css'
})
export class Acompanhamento implements OnInit {

  progresso = inject(ProgressoService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.progresso.carregarResponsavel();

    interval(5000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.progresso.carregarResponsavel());
  }
}