export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED';
export interface Order { id?:number;customerId:number;customerName?:string;totalAmount:number;status:OrderStatus;createdAt?:string;items:OrderItem[]; }
export interface OrderItem { id?:number;orderId?:number;menuItemId:number;menuItemName?:string;quantity:number;price:number; }
export interface CreateOrderRequest { customerId:number; }
