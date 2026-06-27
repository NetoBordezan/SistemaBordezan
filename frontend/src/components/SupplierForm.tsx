import { useEffect, useState } from "react";
import type { Supplier } from "../types/Supplier";

interface SupplierFormProps {
    supplierToEdit: Supplier | null;
    onSaveSupplier: (supplier: Supplier) => void;
    onCancelEdit: () => void;
}

function SupplierForm({
                          supplierToEdit,
                          onSaveSupplier,
                          onCancelEdit,
                      }: SupplierFormProps) {
    const [supplier, setSupplier] = useState<Supplier>({
        name: "",
        email: "",
        cnpj: "",
        phone: "",
        active: true,
    });

    useEffect(() => {
        if (supplierToEdit) {
            setSupplier(supplierToEdit);
        }
    }, [supplierToEdit]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setSupplier({
            ...supplier,
            [name]: value,
        });
    }

    function clearForm() {
        setSupplier({
            name: "",
            email: "",
            cnpj: "",
            phone: "",
            active: true,
        });
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        onSaveSupplier(supplier);
        clearForm();
    }

    function handleCancel() {
        clearForm();
        onCancelEdit();
    }

    return (
        <form className="supplier-form" onSubmit={handleSubmit}>
            <h3>{supplierToEdit ? "Editar Fornecedor" : "Novo Fornecedor"}</h3>

            <input
                type="text"
                name="name"
                placeholder="Nome do fornecedor"
                value={supplier.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={supplier.email}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="cnpj"
                placeholder="CNPJ"
                value={supplier.cnpj}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="phone"
                placeholder="Telefone"
                value={supplier.phone}
                onChange={handleChange}
                required
            />

            <button type="submit">
                {supplierToEdit ? "Atualizar" : "Cadastrar"}
            </button>

            {supplierToEdit && (
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    Cancelar
                </button>
            )}
        </form>
    );
}

export default SupplierForm;