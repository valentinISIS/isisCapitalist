import { Component, Input } from '@angular/core';
import { Product } from '../class';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product: Product = new Product;
  @Input()
  set prod(value: Product) {
    this.product = value;
  }
}
