import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  name=''; mobile=''; loading=false; error='';
  constructor(private api: ApiService, private router: Router) {}
  onSubmit() {
    if (!this.name.trim() || !this.mobile.trim()) { this.error='Please fill in both fields.'; return; }
    if (!/^\d{10}$/.test(this.mobile)) { this.error='Mobile number must be 10 digits.'; return; }
    this.error=''; this.loading=true;
    this.api.post<Customer>('/customers/create',{name:this.name.trim(),mobile:this.mobile.trim()}).subscribe({
      next:(c)=>{ localStorage.setItem('relish_customer',JSON.stringify(c)); this.router.navigate(['/menu']); },
      error:(e)=>{ this.error=e?.error?.error||'Something went wrong.'; this.loading=false; },
    });
  }
}
