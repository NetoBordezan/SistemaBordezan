import { useState } from "react";

import type { Supplier } from "../types/Supplier";
import type { StatusFilter } from "../utils/filterByNameAndStatus";

import { useCrud } from "../hooks/useCrud";

import SupplierForm from "../components/SupplierForm";

import {
    createSupplier,
    deleteSupplier,
    getSuppliers,
    updateSupplier,
} from "../services/supplierService";

import { filterByNameAndStatus } from "../utils/filterByNameAndStatus";

function Suppliers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    const {
        items: suppliers,
        itemToEdit: supplierToEdit,
        showForm,
        loading,
        error,

        openNewForm: openNewSupplierForm,
        openEditForm: openEditSupplierForm,
        closeForm,

        saveItem: handleSaveSupplier,
        deleteItem: handleDeleteSupplier,
    } = useCrud<Supplier>({
        list: getSuppliers,
        create: createSupplier,
        update: updateSupplier,
        remove: deleteSupplier,

        messages: {
            loadError: "Erro ao buscar fornecedores do back-end",
            createError: "Erro ao cadastrar fornecedor",
            updateError: "Erro ao atualizar fornecedor",
            deleteError: "Erro ao excluir fornecedor",
            confirmDelete: "Deseja realmente excluir este fornecedor?",
        },
    });

    const filteredSuppliers = filterByNameAndStatus(
        suppliers,
        searchTerm,
        statusFilter
    );

    return (
        <div className="page">
            <header className="page-header page-header-with-action">
                <div>
                    <h1>Fornecedores</h1>
                    <p>Gerencie os fornecedores cadastrados no sistema.</p>
                </div>

                {!showForm && (
                    <button className="new-button" onClick={openNewSupplierForm}>
                        Cadastrar novo fornecedor
                    </button>
                )}
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
                    <div className="list-header">
                        <div>
                            <h3>Fornecedores cadastrados</h3>
                            <p className="list-description">
                                {filteredSuppliers.length} fornecedor(es) encontrado(s)
                            </p>
                        </div>

                        <div className="list-filters">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Buscar fornecedor..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />

                            <select
                                className="status-filter"
                                value={statusFilter}
                                onChange={(event) =>
                                    setStatusFilter(event.target.value as "all" | "active" | "inactive")
                                }
                            >
                                <option value="all">Todos os status</option>
                                <option value="active">Ativos</option>
                                <option value="inactive">Inativos</option>
                            </select>
                        </div>
                    </div>

                    {loading && <p>Carregando fornecedores...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!loading && !error && suppliers.length === 0 && (
                        <div className="empty-state">
                            <strong>Nenhum fornecedor cadastrado.</strong>
                            <span>Cadastre o primeiro fornecedor usando o botão acima.</span>
                        </div>
                    )}

                    {!loading && !error && suppliers.length > 0 && filteredSuppliers.length === 0 && (
                        <div className="empty-state">
                            <strong>Nenhum fornecedor encontrado.</strong>
                            <span>Altere a busca ou o filtro de status.</span>
                        </div>
                    )}

                    <ul className="supplier-list">
                        {filteredSuppliers.map((supplier) => (
                            <li key={supplier.id} className="supplier-item">
                                <div className="supplier-card-header">
                                    <div>
                                        <strong>{supplier.name}</strong>
                                        <span className="supplier-contact-name">
                                            {supplier.email}
                                        </span>
                                    </div>
                                    <span className={`status-badge ${supplier.active !== false ? "active" : "inactive"}`}>
                                        {supplier.active !== false ? "Ativo" : "Inativo"}
                                    </span>
                                </div>

                                <div className="supplier-details">
                                    <div>
                                        <span className="detail-label">CNPJ</span>
                                        <span>{supplier.cnpj || "Não informado"}</span>
                                    </div>
                                    <div>
                                        <span className="detail-label">Telefone</span>
                                        <span>{supplier.phone || "Não informado"}</span>
                                    </div>
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
