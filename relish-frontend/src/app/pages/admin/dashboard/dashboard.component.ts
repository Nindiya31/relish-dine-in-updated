import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Order } from '../../../models/order.model';

@Component({
  selector:'app-dashboard',standalone:true,imports:[CommonModule,RouterLink],
  templateUrl:'./dashboard.component.html',styleUrl:'./dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  orders:Order[]=[]; loading=true;
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    if(!sessionStorage.getItem('relish_admin')){this.router.navigate(['/admin/login']);return;}
    this.api.get<Order[]>('/orders').subscribe({next:(o)=>{this.orders=o;this.loading=false;},error:()=>{this.loading=false;}});
  }
  get total(){return this.orders.length;}
  get pending(){return this.orders.filter(o=>o.status==='PENDING').length;}
  get confirmed(){return this.orders.filter(o=>o.status==='CONFIRMED').length;}
  get completed(){return this.orders.filter(o=>o.status==='COMPLETED').length;}
  logout(){sessionStorage.removeItem('relish_admin');this.router.navigate(['/admin/login']);}
}
