import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { MenuItem, MENU_CATEGORIES } from '../../../models/menu.model';

@Component({
  selector:'app-menu-management',standalone:true,imports:[CommonModule,FormsModule,RouterLink],
  templateUrl:'./menu-management.component.html',styleUrl:'./menu-management.component.css',
})
export class MenuManagementComponent implements OnInit {
  items:MenuItem[]=[]; loading=true; showForm=false; saving=false; editingId:number|null=null;
  categories=MENU_CATEGORIES;
  form:MenuItem=this.emptyForm();
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    if(!sessionStorage.getItem('relish_admin')){this.router.navigate(['/admin/login']);return;}
    this.loadItems();
  }
  emptyForm():MenuItem{return{name:'',description:'',price:0,category:'SOUPS',available:true};}
  loadItems(){this.api.get<MenuItem[]>('/menu').subscribe({next:(i)=>{this.items=i;this.loading=false;},error:()=>{this.loading=false;}});}
  openAdd(){this.form=this.emptyForm();this.editingId=null;this.showForm=true;}
  openEdit(item:MenuItem){this.form={...item};this.editingId=item.id!;this.showForm=true;}
  cancelForm(){this.showForm=false;}
  saveItem(){
    this.saving=true;
    const obs=this.editingId?this.api.put<MenuItem>(`/menu/${this.editingId}`,this.form):this.api.post<MenuItem>('/menu/create',this.form);
    obs.subscribe({next:()=>{this.saving=false;this.showForm=false;this.loadItems();},error:()=>{this.saving=false;}});
  }
  toggleAvailable(item:MenuItem){this.api.put(`/menu/${item.id}`,{...item,available:!item.available}).subscribe({next:()=>{item.available=!item.available;}});}
  deleteItem(item:MenuItem){
    if(!confirm(`Delete "${item.name}"?`))return;
    this.api.delete(`/menu/${item.id}`).subscribe({next:()=>{this.items=this.items.filter(i=>i.id!==item.id);}});
  }
  logout(){sessionStorage.removeItem('relish_admin');this.router.navigate(['/admin/login']);}
}
