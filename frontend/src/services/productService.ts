import type { Product } from "../types/Product";

const API_URL = "http://localhost:8080/products";

function createProductPayload(product: Product) {
    return {
        name: product.name,
        description: product.description,
        price: product.price,
        unitOfMeasure: product.unitOfMeasure,
        active: product.active ?? true,
    };
}

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
    }

    return response.json();
}

export async function createProduct(product: Product): Promise<Product> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createProductPayload(product)),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar fornecedor");
    }

    return response.json();
}

export async function updateProduct(
    id: number,
    product: Product
): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createProductPayload(product)),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
    }

    return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir produto");
    }
}