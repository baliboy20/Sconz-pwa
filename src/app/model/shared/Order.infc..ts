export interface OrderItems {
  size: string;
  price: string;
  variant: string;
  vId: string;
  qty: number;
  grindType: string;
  description: string;
  thumbUrl: string;
  productItemUrl: string;
}

export interface Order {
  cart: OrderItems[];
  qty: number;
  total: number;
  orderStatus: string;  // suspended, open, closed
}
