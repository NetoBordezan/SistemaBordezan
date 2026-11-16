import type { Ingredient } from "./Ingredient";

export interface RecipeIngredient {
    id?: number;
    quantity: number;
    ingredient: Ingredient;
}

export interface RecipeIngredientPayload {
    quantity: number;
    ingredient: {
        id: number;
    };
}