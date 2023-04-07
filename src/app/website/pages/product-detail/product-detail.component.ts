import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/interface/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  productId: string | null = null;
  product: Product | null = null;

  constructor(private router: Router,private route: ActivatedRoute,private productService: ProductsService ){}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');
        if(this.productId != null){
           return this.productService.getProduct(this.productId)
        }
        return [];
      })
    ).subscribe(x =>{
        this.product = x;
    })
  }

  goToBack(id:any) {
    // this.location.back();
    this.router.navigate(['/category', id]);
}
}
