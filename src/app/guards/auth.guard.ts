import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const token = this.tokenService.getToken();
    // if(!token){
    //   this.route.navigate(['/home']);
    //   return false;
    // }else{
    //   return true;
    // }
    return this.authService.user$
    .pipe(
      map(user => {
        if(!user){
          this.route.navigate(['/home']);
          return false;
        }else{
          return true;
        }
      })
    )
  }
  
}
