import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  
  @Input() product: Product  = {
    id: '',
    title: '',
    images: [],
    price: 0,
    category: {
      id: '',
      name: '',
      typeImg: ''
    },
    description: ''
  }
  @Output () addedProduct = new EventEmitter<Product>();
  @Output () showProduct = new EventEmitter<string>();
  
  onAddToCart (){
    this.addedProduct.emit(this.product)
    // console.log(this.product);
  }
  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }
}
