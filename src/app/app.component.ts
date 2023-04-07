import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';
// import { Product } from './interface/product/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-store';
  imgParent  = '';
  showImg = true;
  token = '';
  imgRta = '';
 
constructor(private authService:AuthService,private userService: UsersService,
  private fileService: FilesService,
  private tokenService: TokenService ){

}
ngOnInit(): void {
  const token = this.tokenService.getToken();
  if(token){
    this.authService.profile().subscribe((x) =>{
      
    })
  }
}

  onLoaded(img:string){
    // console.log('log padre' + img);
  }
  toggleImg(){
    this.showImg = !this.showImg;
  }
  createUser(){
    this.userService.create({
      name:'Hola',
      email: 'tucorreo@mail.com',
      password: '1212',
      role: 'admin'
    }).subscribe((x) =>{
      console.log(x);
    })
  }

  login(){
    this.authService.login('tucorreo@mail.com','1212').subscribe((x) =>{
      console.log(x.access_token);
      this.token = x.access_token;
    })
  }
  getProfile(){
    this.authService.profile().subscribe((x) =>{
      console.log(x);
    })
  }
  download() {
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }
  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file).subscribe((x) =>{
        this.imgRta = x.location;
      });
    }
  }
}
