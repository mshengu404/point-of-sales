export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface SaleTransaction {
  products: Product[];
  totalAmount: number;
  upsells?: Product[];
}
