import type { Ingredient } from "../types/Ingredient";

const API_URL = "http://localhost:8080/ingredients";

function createIngredientPayload(ingredient: Ingredient) {
    return {
        name: ingredient.name,
        unitOfMeasure: ingredient.unitOfMeasure,
        minimumQuantity: ingredient.minimumQuantity,
        cost: ingredient.cost,
        active: ingredient.active ?? true,
    };
}

export async function getIngredients(): Promise<Ingredient[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar matérias-primas");
    }

    return response.json();
}

export async function createIngredient(ingredient: Ingredient): Promise<Ingredient> {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createIngredientPayload(ingredient)),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar matéria-prima");
    }

    return response.json();
}

export async function updateIngredient(
    id: number,
    ingredient: Ingredient
): Promise<Ingredient> {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createIngredientPayload(ingredient)),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar matéria-prima");
    }

    return response.json();
}

export async function deleteIngredient(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir matéria-prima");
    }
}