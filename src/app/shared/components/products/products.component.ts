import { Component, Input, EventEmitter, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { CreateProduct, Product, UpdateProduct } from 'src/app/interface/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart :Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null){
    if(id != null){
      this.onShowDetail(id);
    }
  }
  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();
  today = new Date();
  date = new Date(2021,1,21);
  showProductDetail = false;
  productChoosen: Product ={
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
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


  constructor(private storeService: StoreService,private productService: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  get(){
    this.productService.getAll().subscribe((x)=>{
      this.products = this.products.concat(x);
    })
  }
  

  onAddToShoppingCart(product: Product){
    // console.log(product);
    this.storeService.addProduct(product);
    // this.myShoppingCart.push(product);
    this.total = this.storeService.getTotal();
    // this.total = this.myShoppingCart.reduce((sum,item) => sum + item.price,0)
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;  
  }
  onShowDetail(id:string){
    this.statusDetail = 'loading';
    if(!this.showProductDetail ){
      this.showProductDetail = true;
    }
    this.productService.getProduct(id).subscribe((x) =>{
      // console.log(x);
      // this.toggleProductDetail();
      this.productChoosen = x;
      this.statusDetail = 'success';
    }, response =>{
      window.alert(response.error.message);
      this.statusDetail = 'error';
    })
  }
  readAndUpdate(id:string){
    this.productService.getProduct(id)
    .pipe(
      switchMap((product) => 
        this.productService.update(product.id,{title:'hola'})
      )
    ).subscribe((x) =>{
      // console.log(x);

    });
   
    this.productService.fetchReadAndUpdate(id,{title: 'hola'}).subscribe((x) =>{
      const read = x[0];
      const update = x[1];
      // console.log(read);
      // console.log(update);
    })
  }

  createNewProduct(){
    const product: CreateProduct = {
      title:'New hola',
      description:'Hola',
      images: [
        'https://imagenes.elpais.com/resizer/gNzZmQBZkD-EwfBNaAJzxeiqgMY=/980x980/cloudfront-eu-central-1.images.arcpublishing.com/prisa/IZJ5HFINBX7SA2VLZKXRUQTXJQ.jpg'
      ],
      price: 100,
      categoryId: 2,
    }
    this.productService.create(product).subscribe(x =>{
      this.products.unshift(x)
    })
  }
  updateProduct(){
    const changes:UpdateProduct = {
      title: 'nuevo title',
    }
    const id = this.productChoosen.id;
    this.productService.update(id,changes).subscribe((x) =>{
      // console.log(x);
      const productIndex = this.products.findIndex((f) => f.id === this.productChoosen.id);
      this.products[productIndex] = x
      this.productChoosen = x;
    })
  }
  deleteProduct(){
    const id = this.productChoosen.id;
    this.productService.delete(id).subscribe(() =>{
      const productIndex = this.products.findIndex((f) => f.id === this.productChoosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    })
  }
  
  
  loadMore() {
    this.onLoadMore.emit();
  }
  
}
