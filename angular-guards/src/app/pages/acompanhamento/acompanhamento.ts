import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressoService } from '../../progresso-service';

@Component({
  selector: 'app-acompanhamento',
  imports: [RouterLink],
  templateUrl: './acompanhamento.html',
  styleUrl: './acompanhamento.css'
})
export class Acompanhamento {
  progresso = inject(ProgressoService);
}