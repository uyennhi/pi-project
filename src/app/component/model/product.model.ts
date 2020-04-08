import { brand } from './brand.model';

// Product model
export interface product {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    saleDate: Date;
    image: string;
    description: string;
    brandEntity: brand;
}