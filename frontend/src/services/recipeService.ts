import type { Recipe } from "../types/Recipe";
import type { RecipeIngredientPayload } from "../types/RecipeIngredient";

import { apiRequest } from "./api";

const RESOURCE = "/recipes";

function buildRecipePayload(recipe: Recipe) {

    const recipeIngredients: RecipeIngredientPayload[] =
        (recipe.recipeIngredients ?? []).map((item) => {

            if (item.ingredient.id == null) {
                throw new Error("Matéria-prima sem identificador.");
            }

            return {
                quantity: item.quantity,
                ingredient: {
                    id: item.ingredient.id,
                },
            };
        });

    return {
        name: recipe.name,
        yield: recipe.yield,
        unitOfMeasure: recipe.unitOfMeasure,
        preparationMethod: recipe.preparationMethod,
        preparationTime: recipe.preparationTime,
        unitOfTime: recipe.unitOfTime,
        active: recipe.active ?? true,
        recipeIngredients,
    };
}

export function getRecipes(): Promise<Recipe[]> {
    return apiRequest<Recipe[]>(
        RESOURCE,
        {},
        "Erro ao buscar fichas técnicas"
    );
}

export function createRecipe(recipe: Recipe): Promise<Recipe> {
    return apiRequest<Recipe>(
        RESOURCE,
        {
            method: "POST",
            body: JSON.stringify(buildRecipePayload(recipe)),
        },
        "Erro ao cadastrar ficha técnica"
    );
}

export function updateRecipe(
    id: number,
    recipe: Recipe
): Promise<Recipe> {
    return apiRequest<Recipe>(
        `${RESOURCE}/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(buildRecipePayload(recipe)),
        },
        "Erro ao atualizar ficha técnica"
    );
}

export function deleteRecipe(id: number): Promise<void> {
    return apiRequest<void>(
        `${RESOURCE}/${id}`,
        { method: "DELETE" },
        "Erro ao excluir ficha técnica"
    );
}