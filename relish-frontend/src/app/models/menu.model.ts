export interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}
export interface MenuItemRequest { name:string;description:string;price:number;category:string;available:boolean; }
export const MENU_CATEGORIES = [
  'SOUPS','MOMOS','CHINESE_VEG','CHINESE_NON_VEG',
  'VEG_APPETIZERS','NON_VEG_APPETIZERS','ITALIAN','PIZZAS',
  'VEG_MAINS','NON_VEG_MAINS','NOODLES_RICE_BIRYANI',
  'BURGERS','WRAPS','SANDWICHES','SIZZLERS_BOWLS','BEVERAGES','DESSERTS',
];
