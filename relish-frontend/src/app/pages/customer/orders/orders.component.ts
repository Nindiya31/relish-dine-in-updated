import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Order } from '../../../models/order.model';
import { Customer } from '../../../models/customer.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector:'app-orders',standalone:true,imports:[CommonModule,NavbarComponent],
  templateUrl:'./orders.component.html',styleUrl:'./orders.component.css',
})
export class OrdersComponent implements OnInit,OnDestroy {
  orders:Order[]=[]; loading=true; customer:Customer|null=null;
  private poll:any;
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    const s=localStorage.getItem('relish_customer');
    if(!s){this.router.navigate(['/home']);return;}
    this.customer=JSON.parse(s); this.loadOrders();
    this.poll=setInterval(()=>this.loadOrders(),15000);
  }
  ngOnDestroy(){if(this.poll)clearInterval(this.poll);}
  loadOrders(){
    this.api.get<Order[]>(`/orders/customer/${this.customer!.id}`).subscribe({
      next:(o)=>{this.orders=o.reverse();this.loading=false;},error:()=>{this.loading=false;},
    });
  }
  statusClass(s:string){return{PENDING:'status-pending',CONFIRMED:'status-confirmed',COMPLETED:'status-completed'}[s]??'';}
  statusLabel(s:string){return{PENDING:'⏳ Pending',CONFIRMED:'✅ Confirmed',COMPLETED:'🎉 Completed'}[s]??s;}
  goToMenu(){this.router.navigate(['/menu']);}
}
