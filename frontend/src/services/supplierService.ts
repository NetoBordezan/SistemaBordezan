import type { Supplier } from "../types/Supplier";
import { apiRequest } from "./api";

const RESOURCE = "/suppliers";

function createSupplierPayload(supplier: Supplier) {
    return {
        name: supplier.name,
        email: supplier.email,
        cnpj: supplier.cnpj,
        phone: supplier.phone,
        active: supplier.active ?? true,
    };
}

export function getSuppliers(): Promise<Supplier[]> {
    return apiRequest<Supplier[]>(
        RESOURCE,
        {},
        "Erro ao buscar fornecedores"
    );
}

export function createSupplier(supplier: Supplier): Promise<Supplier> {
    return apiRequest<Supplier>(
        RESOURCE,
        {
            method: "POST",
            body: JSON.stringify(createSupplierPayload(supplier)),
        },
        "Erro ao cadastrar fornecedor"
    );
}

export function updateSupplier(
    id: number,
    supplier: Supplier
): Promise<Supplier> {
    return apiRequest<Supplier>(
        `${RESOURCE}/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(createSupplierPayload(supplier)),
        },
        "Erro ao atualizar fornecedor"
    );
}

export function deleteSupplier(id: number): Promise<void> {
    return apiRequest<void>(
        `${RESOURCE}/${id}`,
        { method: "DELETE" },
        "Erro ao excluir fornecedor"
    );
}