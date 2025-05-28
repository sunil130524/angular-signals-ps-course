import { Component } from '@angular/core';
import { ProductSelection } from './products/product-selection/product-selection';

@Component({
  selector: 'app-root',
  imports: [ProductSelection],
  template: `
    <app-product-selection/>
  `,
  styleUrl: './app.css'
})
export class App {
  title = 'Acme Product Management';
}
