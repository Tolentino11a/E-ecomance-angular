import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url = `${environment.API_URL}/api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit),
      params = params.set('offset', offset)
    }
    return this.http.get<Category[]>(this.url, {params})
  }
}