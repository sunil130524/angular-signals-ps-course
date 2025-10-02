import {
  Component,
  computed,
  effect,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductData } from '../product-data';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css',
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  products = signal(ProductData.products);
  selectedProduct = signal<Product | undefined>(undefined);
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: (p) => 1,
  });

  total = computed(() => {
    return (this.selectedProduct()?.price ?? 0) * this.quantity();
  });
  totalColor = computed(() => {
    return this.total() > 200 ? 'green' : 'blue';
  });

  onDecrease() {
    this.quantity.update((q) => {
      return q <= 0 ? 0 : q - 1;
    });
  }

  onIncrease() {
    this.quantity.update((q) => q + 1);
  }

  qtyEffect = effect(() =>
    console.log('selectedProduct', this.selectedProduct())
  );
}
