import type { Ingredient } from "../types/Ingredient";
import { apiRequest } from "./api";

const RESOURCE = "/ingredients";


function createIngredientPayload(ingredient: Ingredient) {
    return {
        name: ingredient.name,
        unitOfMeasure: ingredient.unitOfMeasure,
        minimumQuantity: ingredient.minimumQuantity,
        cost: ingredient.cost,
        active: ingredient.active ?? true,
    };
}

export function getIngredients(): Promise<Ingredient[]> {
    return apiRequest<Ingredient[]>(
        RESOURCE,
        {},
        "Erro ao buscar matérias-primas"
    );
}

export function createIngredient(
    ingredient: Ingredient
): Promise<Ingredient> {

    return apiRequest<Ingredient>(
        RESOURCE,
        {
            method: "POST",
            body: JSON.stringify(createIngredientPayload(ingredient)),
        },
        "Erro ao cadastrar matéria-prima"
    );
}

export function updateIngredient(
    id: number,
    ingredient: Ingredient
): Promise<Ingredient> {

    return apiRequest<Ingredient>(
        `${RESOURCE}/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(createIngredientPayload(ingredient)),
        },
        "Erro ao atualizar matéria-prima"
    );
}

export function deleteIngredient(id: number): Promise<void> {
    return apiRequest<void>(
        `${RESOURCE}/${id}`,
        {
            method: "DELETE",
        },
        "Erro ao excluir matéria-prima"
    );
}