import { Component } from '@angular/core';

@Component({
  selector: 'app-mundo',
  template: '',
})
export class Mundo {
  constructor() {
    window.location.href = '/mundo.html';
  }
}