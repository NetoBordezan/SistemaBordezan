import { useEffect, useState } from "react";
import SupplierForm from "../components/SupplierForm";
import {
    createSupplier,
    deleteSupplier,
    getSuppliers,
    updateSupplier,
} from "../services/supplierService";
import type { Supplier } from "../types/Supplier";

function Suppliers() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplierToEdit, setSupplierToEdit] = useState<Supplier | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadSuppliers();
    }, []);

    function loadSuppliers() {
        setLoading(true);
        setError("");

        getSuppliers()
            .then((data) => setSuppliers(data))
            .catch((error) => {
                console.error(error);
                setError("Erro ao buscar fornecedores do back-end");
            })
            .finally(() => setLoading(false));
    }

    function openNewSupplierForm() {
        setSupplierToEdit(null);
        setShowForm(true);
    }

    function openEditSupplierForm(supplier: Supplier) {
        setSupplierToEdit(supplier);
        setShowForm(true);
    }

    function closeForm() {
        setSupplierToEdit(null);
        setShowForm(false);
    }

    function handleSaveSupplier(supplier: Supplier) {
        if (supplier.id !== undefined) {
            updateSupplier(supplier.id, supplier)
                .then((updatedSupplier) => {
                    setSuppliers((current) =>
                        current.map((item) =>
                            item.id === updatedSupplier.id ? updatedSupplier : item
                        )
                    );
                    closeForm();
                })
                .catch((error) => {
                    console.error(error);
                    alert("Erro ao atualizar fornecedor");
                });
            return;
        }

        createSupplier(supplier)
            .then((createdSupplier) => {
                setSuppliers((current) => [...current, createdSupplier]);
                closeForm();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao cadastrar fornecedor");
            });
    }

    function handleDeleteSupplier(id: number) {
        if (!confirm("Deseja realmente excluir este fornecedor?")) {
            return;
        }

        deleteSupplier(id)
            .then(() => {
                setSuppliers((current) =>
                    current.filter((supplier) => supplier.id !== id)
                );

                if (supplierToEdit?.id === id) {
                    closeForm();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao excluir fornecedor");
            });
    }

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page">
            <header className="page-header">
                <div>
                    <h1>Fornecedores</h1>
                    <p>Gerencie os fornecedores cadastrados no sistema.</p>
                </div>
            </header>

            <main className={`content ${showForm ? "content-with-form" : "content-centered"}`}>
                {showForm && (
                    <section className="form-section">
                        <SupplierForm
                            supplierToEdit={supplierToEdit}
                            onSaveSupplier={handleSaveSupplier}
                            onCancelEdit={closeForm}
                        />
                    </section>
                )}

                <section className="list-section">
                    {!showForm && (
                        <button className="new-button" onClick={openNewSupplierForm}>
                            + Cadastrar novo fornecedor
                        </button>
                    )}

                    <div className="list-header">
                        <h3>Fornecedores cadastrados</h3>
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Buscar fornecedor..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>

                    {loading && <p>Carregando fornecedores...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!loading && !error && suppliers.length === 0 && (
                        <p>Nenhum fornecedor cadastrado.</p>
                    )}

                    {!loading && !error && suppliers.length > 0 && filteredSuppliers.length === 0 && (
                        <p>Nenhum fornecedor encontrado.</p>
                    )}

                    <ul className="supplier-list">
                        {filteredSuppliers.map((supplier) => (
                            <li key={supplier.id} className="supplier-item">
                                <div className="supplier-info">
                                    <strong>{supplier.name}</strong>
                                    <span>E-mail: {supplier.email}</span>
                                    <span>CNPJ: {supplier.cnpj}</span>
                                    <span>Telefone: {supplier.phone}</span>
                                    <span>Status: {supplier.active ? "Ativo" : "Inativo"}</span>
                                </div>

                                <div className="supplier-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => openEditSupplierForm(supplier)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            if (supplier.id !== undefined) {
                                                handleDeleteSupplier(supplier.id);
                                            }
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Suppliers;
