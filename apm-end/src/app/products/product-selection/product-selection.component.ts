import { Component, computed, effect, inject, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ReviewListComponent } from '../../reviews/review-list/review-list.component';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe, ReviewListComponent],
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css'
})
export class ProductSelectionComponent {
  pageTitle = 'Product Selection'
  private productService = inject(ProductService);

  // Signals used by the template
  selectedProduct = this.productService.selectedProduct;
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1
  });

  // If calling a method in the service to create the resource
  // productsResource = this.productService.createProducts();

  // Reference the signals in the service to simplify the template code
  products = this.productService.productsResource.value;
  isLoading = this.productService.productsResource.isLoading;
  error = this.productService.productsResource.error;
  errorMessage = computed(() => {
    const err = this.error() as HttpErrorResponse;
    if (err) {
      return `${err.status} - ${err.statusText}: ${err.url}`
    }
    return '';
  });

  // If using a method in the service:
  // productsResource = this.productService.createProducts()
  // products = this.productsResource.value;

  // React to changes and recompute
  total = computed(() =>
    (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'green' : 'blue');

  qtyEffect = effect(() => console.log('quantity', this.quantity()));
  selEffect = effect(() => console.log('selected product:', this.selectedProduct()?.productName));
  prodEff = effect(() => console.log('products:', JSON.stringify(this.products())));
  statusEff = effect(() => console.log('request status:', this.productService.productsResource.status()));

  onDecrease() {
    this.quantity.update(q => q <= 0 ? 0 : q - 1);
  }

  onIncrease() {
    this.quantity.update(q => q + 1);
    // To see how the effect is scheduled
    // this.quantity.set(2);
    // this.quantity.set(42);
    // this.quantity.set(12);
  }

}
