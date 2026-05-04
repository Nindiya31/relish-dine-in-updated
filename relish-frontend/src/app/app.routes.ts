import { Routes } from '@angular/router';
export const routes: Routes = [
  { path:'',redirectTo:'home',pathMatch:'full' },
  { path:'home',loadComponent:()=>import('./pages/customer/home/home.component').then(m=>m.HomeComponent) },
  { path:'menu',loadComponent:()=>import('./pages/customer/menu/menu.component').then(m=>m.MenuComponent) },
  { path:'cart',loadComponent:()=>import('./pages/customer/cart/cart.component').then(m=>m.CartComponent) },
  { path:'orders',loadComponent:()=>import('./pages/customer/orders/orders.component').then(m=>m.OrdersComponent) },
  { path:'admin',redirectTo:'admin/login',pathMatch:'full' },
  { path:'admin/login',loadComponent:()=>import('./pages/admin/login/login.component').then(m=>m.AdminLoginComponent) },
  { path:'admin/dashboard',loadComponent:()=>import('./pages/admin/dashboard/dashboard.component').then(m=>m.DashboardComponent) },
  { path:'admin/orders-management',loadComponent:()=>import('./pages/admin/orders-management/orders-management.component').then(m=>m.OrdersManagementComponent) },
  { path:'admin/menu-management',loadComponent:()=>import('./pages/admin/menu-management/menu-management.component').then(m=>m.MenuManagementComponent) },
  { path:'**',redirectTo:'home' },
];
