export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    unitOfMeasure: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}