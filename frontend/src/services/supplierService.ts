import type { Supplier } from "../types/Supplier";

const API_URL = "http://localhost:8080/suppliers";

function createSupplierPayload(supplier: Supplier) {
    return {
        name: supplier.name,
        email: supplier.email,
        cnpj: supplier.cnpj,
        phone: supplier.phone,
        active: supplier.active ?? true,
    };
}

export async function getSuppliers(): Promise<Supplier[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar fornecedores");
    }

    return response.json();
}

export async function createSupplier(supplier: Supplier): Promise<Supplier> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createSupplierPayload(supplier)),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar fornecedor");
    }

    return response.json();
}

export async function updateSupplier(
    id: number,
    supplier: Supplier
): Promise<Supplier> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createSupplierPayload(supplier)),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar fornecedor");
    }

    return response.json();
}

export async function deleteSupplier(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir fornecedor");
    }
}