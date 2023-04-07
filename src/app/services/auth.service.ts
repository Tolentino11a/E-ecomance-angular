import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interface/login.interface';
import { CreateUser, User } from '../interface/user.interface';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.API_URL}/api/auth`;

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient,private tokenService: TokenService) { }
  
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.url}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }
  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile()),

    )
  }

  profile(){
    // const headers = new HttpHeaders();
    // headers.set('Authorization',`Bearer ${token}`);
    return this.http.get<User>(`${this.url}/profile`)
    .pipe(
      tap(user => this.user.next(user))
    );
  }
  logout(){
    this.tokenService.removeToken();
  }
}
