import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: '',
})
export class Home {
  constructor() {
    window.location.href = '/index.html';
  }
}