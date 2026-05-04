import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Order, OrderStatus } from '../../../models/order.model';

@Component({
  selector:'app-orders-management',standalone:true,imports:[CommonModule,RouterLink],
  templateUrl:'./orders-management.component.html',styleUrl:'./orders-management.component.css',
})
export class OrdersManagementComponent implements OnInit {
  orders:Order[]=[]; loading=true; updating:number|null=null; filterStatus='ALL';
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    if(!sessionStorage.getItem('relish_admin')){this.router.navigate(['/admin/login']);return;}
    this.loadOrders();
  }
  loadOrders(){
    this.api.get<Order[]>('/orders').subscribe({next:(o)=>{this.orders=o.reverse();this.loading=false;},error:()=>{this.loading=false;}});
  }
  get filtered(){return this.filterStatus==='ALL'?this.orders:this.orders.filter(o=>o.status===this.filterStatus);}
  updateStatus(order:Order,status:OrderStatus){
    this.updating=order.id!;
    this.api.put(`/orders/status/${order.id}`,{status}).subscribe({
      next:()=>{order.status=status;this.updating=null;},error:()=>{this.updating=null;}
    });
  }
  nextStatus(s:OrderStatus):OrderStatus|null{return{PENDING:'CONFIRMED',CONFIRMED:'COMPLETED',COMPLETED:null}[s] as OrderStatus|null;}
  nextLabel(s:OrderStatus):string{return{PENDING:'Confirm',CONFIRMED:'Complete',COMPLETED:''}[s]??'';}
  statusClass(s:string){return{PENDING:'status-pending',CONFIRMED:'status-confirmed',COMPLETED:'status-completed'}[s]??'';}
  logout(){sessionStorage.removeItem('relish_admin');this.router.navigate(['/admin/login']);}
}
