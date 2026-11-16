import type { Product } from "../types/Product";
import { apiRequest } from "./api";

const RESOURCE = "/products";

function createProductPayload(product: Product) {
    return {
        name: product.name,
        description: product.description,
        price: product.price,
        unitOfMeasure: product.unitOfMeasure,
        active: product.active ?? true,
    };
}

export function getProducts(): Promise<Product[]> {
    return apiRequest<Product[]>(
        RESOURCE,
        {},
        "Erro ao buscar produtos"
    );
}

export function createProduct(product: Product): Promise<Product> {
    return apiRequest<Product>(
        RESOURCE,
        {
            method: "POST",
            body: JSON.stringify(createProductPayload(product)),
        },
        "Erro ao cadastrar produto"
    );
}

export function updateProduct(
    id: number,
    product: Product
): Promise<Product> {
    return apiRequest<Product>(
        `${RESOURCE}/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(createProductPayload(product)),
        },
        "Erro ao atualizar produto"
    );
}

export function deleteProduct(id: number): Promise<void> {
    return apiRequest<void>(
        `${RESOURCE}/${id}`,
        { method: "DELETE" },
        "Erro ao excluir produto"
    );
}