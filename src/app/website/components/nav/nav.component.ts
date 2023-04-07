import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/interface/product.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(private storeService: StoreService, 
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router){

  }
  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) =>{
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe((x) =>{
      this.profile = x;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }
  // login(){
  //   this.authService.login('tucorreo@mail.com','1212').subscribe((x) =>{
  //     this.token = x.access_token;
  //     console.log(this.token);
  //     this.getProfile();
  //   })
  // }
  login() {
    this.authService.loginAndGet('tucorreo@mail.com','1212').subscribe(user => {
        this.router.navigate(['/profile']);
      });
  }
  logout(){
    this.authService.logout();
    this.profile  = null;
    this.router.navigate(['/home']);
  }
  getAllCategories(){
    this.categoriesService.getAll().subscribe((x) =>{
      this.categories = x
    });
  }

}
