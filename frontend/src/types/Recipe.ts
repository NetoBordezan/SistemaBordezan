import type { RecipeIngredient } from "./RecipeIngredient";

export interface Recipe{
    id?:number;
    name:string;
    yield:number;
    unitOfMeasure:string;
    preparationMethod:string;
    preparationTime:number;
    unitOfTime:string;
    recipeIngredients?: RecipeIngredient[];
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}