// Assuming you have a file at ../model/saleTransaction.ts

export interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface SaleTransaction {
    products: Product[]; // Array of products sold
    totalAmount: number; // Total amount of the sale
    upsells?: Product[]; // Optional array of upsell products
}
