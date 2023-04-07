import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUser, User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) { }
  
  create(dto: CreateUser){
    return this.http.post(this.url,dto);
  }
  getAll(){
    return this.http.get<User[]>(this.url);
  }
}
