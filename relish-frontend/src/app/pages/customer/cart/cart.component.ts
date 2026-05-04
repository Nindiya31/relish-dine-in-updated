import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Cart, CartItem } from '../../../models/cart.model';
import { Customer } from '../../../models/customer.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector:'app-cart',standalone:true,imports:[CommonModule,NavbarComponent],
  templateUrl:'./cart.component.html',styleUrl:'./cart.component.css',
})
export class CartComponent implements OnInit {
  cart:Cart|null=null; loading=true; placing=false; error=''; customer:Customer|null=null;
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    const s=localStorage.getItem('relish_customer');
    if(!s){this.router.navigate(['/home']);return;}
    this.customer=JSON.parse(s); this.loadCart();
  }
  loadCart(){
    this.loading=true;
    this.api.get<Cart>(`/cart/${this.customer!.id}`).subscribe({
      next:(c)=>{this.cart=c;this.loading=false;},error:()=>{this.loading=false;},
    });
  }
  get total(){return this.cart?.items.reduce((s,i)=>s+(i.menuItemPrice??0)*i.quantity,0)??0;}
  removeItem(item:CartItem){
    this.api.delete(`/cart/remove/${item.id}`).subscribe({next:()=>this.loadCart(),error:()=>{this.error='Could not remove.';},});
  }
  placeOrder(){
    if(!this.cart?.items?.length)return;
    this.placing=true;
    this.api.post('/orders/create',{customerId:this.customer!.id}).subscribe({
      next:()=>{this.placing=false;this.router.navigate(['/orders']);},
      error:(e)=>{this.placing=false;this.error=e?.error?.error||'Could not place order.';},
    });
  }
  goToMenu(){this.router.navigate(['/menu']);}
}
