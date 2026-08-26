import { useEffect, useState } from "react";
import {isValidCNPJ} from 'cnpj-cpf-validator';
import {IMaskInput} from 'react-imask';
import type { Supplier } from "../types/Supplier";

interface SupplierFormProps {
    supplierToEdit: Supplier | null;
    onSaveSupplier: (supplier: Supplier) => void;
    onCancelEdit: () => void;
}

function SupplierForm({supplierToEdit,onSaveSupplier,onCancelEdit}: SupplierFormProps) {
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
    
    //limpa o formulário
    function clearForm() {
        setSupplier({
            name: "",
            email: "",
            cnpj: "",
            phone: "",
            active: true,
        });
    }

    //função para envio do formulário
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        //Validação do CNPJ
        if(!isValidCNPJ(supplier.cnpj)) {
            alert("CNPJ inválido. Por favor, insira um CNPJ válido.");
            return;
        }

        onSaveSupplier(supplier);
        clearForm();
    }

    //Cancelar formulário de edição
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

            <IMaskInput
                type="text"
                name="cnpj"
                mask="00.000.000/0000-00"
                placeholder="00.000.000/0000-00"
                value={supplier.cnpj}
                onChange={handleChange}
                required
            />

            <IMaskInput
                type="text"
                name="phone"
                mask="(00) 00000-0000"
                placeholder="(00) 00000-0000"
                value={supplier.phone}
                onChange={handleChange}
                required
            />

            <button type="submit">
                {supplierToEdit ? "Atualizar" : "Cadastrar"}
            </button>

            <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancelar
            </button>
        </form>
    );
}

export default SupplierForm;