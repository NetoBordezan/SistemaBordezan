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
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
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

    const filteredSuppliers = suppliers.filter((supplier) => {
        const matchesSearch = supplier.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && supplier.active) ||
            (statusFilter === "inactive" && !supplier.active);

        return matchesSearch && matchesStatus;
    });

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
                                    <span className={`status-badge ${supplier.active ? "active" : "inactive"}`}>
                                        {supplier.active ? "Ativo" : "Inativo"}
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
