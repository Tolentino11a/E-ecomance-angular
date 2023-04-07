import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,throwError,map, zip } from 'rxjs';
import { Product,CreateProduct, UpdateProduct } from '../interface/product.interface';
import { environment } from '../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private url = `${environment.API_URL}/api`;

  constructor( private http: HttpClient) { }
  
  getByCategory(categoryId: string,limit?: number,offset?:number){
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.url}/categories/${categoryId}/products`, { params})
  }
  getAll(limit?: number,offset?:number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.url}/products/`,{ params,context: checkTime() })
    .pipe(
      // retry(3)
      map(products => products.map((x) =>{
        return {
          ...x,
          taxes: .15 * x.price
        }
      }))
    )
    ;
  }
  
  fetchReadAndUpdate(id:string,data: UpdateProduct){
    return zip(
      this.getProduct(id),
      this.update(id,data)

    )
  }
  getProducts(limit: number,offset:number) {
    return this.http.get<Product[]>(`${this.url}/products/`, {
      params: {limit,offset}
    });
  }
  getProduct(id:string) {
    return this.http.get<Product>(`${this.url}/products/${id}`).
    pipe(
        catchError((error: HttpErrorResponse) =>{
          if(error.status === 500){
            return throwError('el servidor tuvo un error')
          }
          if(error.status === 400){
            return throwError('el producto no existe')
          }
          return throwError('ups algo salio mal')
        })
    );
  }
  create(data: CreateProduct){
    return this.http.post<Product>(`${this.url}/products/`, data);
  }
  update(id:string,data: UpdateProduct){
    return this.http.put<Product>(`${this.url}/products/${id}`, data);
  }
  delete(id:string) {
    return this.http.delete<boolean>(`${this.url}/products/${id}`);
  }
}
