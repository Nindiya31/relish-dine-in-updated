export interface Cart { id?:number;customerId:number;createdAt?:string;items:CartItem[]; }
export interface CartItem { id?:number;cartId?:number;menuItemId:number;menuItemName?:string;menuItemPrice?:number;quantity:number; }
export interface AddToCartRequest { customerId:number;menuItemId:number;quantity:number; }
