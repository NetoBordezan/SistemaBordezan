export interface Supplier {
    id?: number;
    name: string;
    email: string;
    cnpj: string;
    phone: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}