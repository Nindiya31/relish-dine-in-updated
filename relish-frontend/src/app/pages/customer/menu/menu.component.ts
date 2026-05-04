import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { MenuItem } from '../../../models/menu.model';
import { AddToCartRequest } from '../../../models/cart.model';
import { Customer } from '../../../models/customer.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector:'app-menu',standalone:true,
  imports:[CommonModule,NavbarComponent],
  templateUrl:'./menu.component.html',styleUrl:'./menu.component.css',
})
export class MenuComponent implements OnInit {
  menuItems:MenuItem[]=[]; filteredItems:MenuItem[]=[]; categories:string[]=[];
  activeCategory='ALL'; loading=true; addingId:number|null=null;
  toastMsg=''; customer:Customer|null=null;
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    const s=localStorage.getItem('relish_customer');
    if(!s){this.router.navigate(['/home']);return;}
    this.customer=JSON.parse(s); this.loadMenu();
  }
  loadMenu(){
    this.api.get<MenuItem[]>('/menu').subscribe({
      next:(items)=>{
        this.menuItems=items.filter(i=>i.available);
        this.filteredItems=this.menuItems;
        this.categories=['ALL',...new Set(items.map(i=>i.category))];
        this.loading=false;
      },
      error:()=>{this.loading=false;},
    });
  }
  filterBy(cat:string){this.activeCategory=cat;this.filteredItems=cat==='ALL'?this.menuItems:this.menuItems.filter(i=>i.category===cat);}
  addToCart(item:MenuItem){
    if(!this.customer?.id)return;
    this.addingId=item.id!;
    const req:AddToCartRequest={customerId:this.customer.id,menuItemId:item.id!,quantity:1};
    this.api.post('/cart/add',req).subscribe({
      next:()=>{this.addingId=null;this.showToast(`${item.name} added!`);},
      error:()=>{this.addingId=null;this.showToast('Could not add item.');},
    });
  }
  showToast(msg:string){this.toastMsg=msg;setTimeout(()=>this.toastMsg='',2500);}
  formatCategory(c:string){return c.replace(/_/g,' ');}
  goToCart(){this.router.navigate(['/cart']);}
}
