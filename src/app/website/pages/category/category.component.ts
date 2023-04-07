import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../../interface/product.interface';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;
  
  constructor(private route: ActivatedRoute,private productService: ProductsService){}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId != null){
           return this.productService.getByCategory(this.categoryId,this.limit,this.offset)
        }
        return [];
      })
    ).subscribe(x =>{
        this.products = x;
    })
    this.route.queryParamMap.subscribe((x) =>{
      this.productId = x.get('product');
      // console.log(this.productId);
    })
  }
  loadMore(): void {
    this.productService.getAll(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  }

}
