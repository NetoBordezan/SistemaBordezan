import type { Recipe } from "../types/Recipe";
import type { RecipeIngredientPayload } from "../types/RecipeIngredient";

const API_URL = "http://localhost:8080/recipes";

function createRecipePayload(recipe: Recipe){
    return{
        name:recipe.name,
        yield:recipe.yield,
        unitOfMeasure:recipe.unitOfMeasure,
        preparationMethod:recipe.preparationMethod,
        preparationTime:recipe.preparationTime,
        unitOfTime:recipe.unitOfTime,
        active: recipe.active ?? true,
    };
}

function buildRecipePayload(recipe: Recipe) {
    const {
        id,
        createdAt,
        updatedAt,
        recipeIngredients = [],
        ...recipeData
    } = recipe;

    const ingredientsPayload: RecipeIngredientPayload[] =
        recipeIngredients.map((item) => {

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
        ...recipeData,
        recipeIngredients: ingredientsPayload,
    };
}

export async function getRecipes(): Promise<Recipe[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar ficha técnicas");
    }

    return response.json();
}

export async function createRecipe(recipe: Recipe): Promise<Recipe> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(buildRecipePayload(recipe)),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar ficha técnica");
    }

    return response.json();
}

export async function updateRecipe(id: number, recipe: Recipe): Promise<Recipe> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(buildRecipePayload(recipe)),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar ficha técnica");
    }

    return response.json();
}

export async function deleteRecipe(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir ficha técnica");
    }
}