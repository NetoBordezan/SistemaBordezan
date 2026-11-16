export interface Ingredient {
    id?: number;
    name: string;
    unitOfMeasure: string;
    minimumQuantity: number;
    cost: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}