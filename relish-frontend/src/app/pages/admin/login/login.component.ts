import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector:'app-admin-login',standalone:true,imports:[CommonModule,FormsModule],
  templateUrl:'./login.component.html',styleUrl:'./login.component.css',
})
export class AdminLoginComponent {
  username=''; password=''; error='';
  constructor(private router:Router){}
  onLogin(){
    if(this.username==='admin'&&this.password==='admin123'){
      sessionStorage.setItem('relish_admin','true');
      this.router.navigate(['/admin/dashboard']);
    } else { this.error='Invalid credentials. Try admin / admin123.'; }
  }
}
