import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myShoppingCart :Product[] = [];
  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(private storeService: StoreService,private productService: ProductsService,
    private route: ActivatedRoute){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  get(){
    this.productService.getAll(this.limit,this.offset).subscribe((x)=>{
      this.products = this.products.concat(x);
      this.offset += this.limit;
    })
    this.route.queryParamMap.subscribe((x) =>{
      this.productId = x.get('product');
      // console.log(this.productId);
    })
  }
  
  ngOnInit(): void {
    this.get();
  }
  
  loadMore(): void {
    this.productService.getAll(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  }

}
