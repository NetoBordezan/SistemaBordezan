import { useState } from "react";

import type { Product } from "../types/Product";
import type { StatusFilter } from "../utils/filterByNameAndStatus";

import { useCrud } from "../hooks/useCrud";
import { filterByNameAndStatus } from "../utils/filterByNameAndStatus";

import ProductForm from "../components/ProductForm";

import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../services/productService";

function Products() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    const {
        items: products,
        itemToEdit: productToEdit,
        showForm,
        loading,
        error,

        openNewForm: openNewProductForm,
        openEditForm: openEditProductForm,
        closeForm,

        saveItem: handleSaveProduct,
        deleteItem: handleDeleteProduct,
    } = useCrud<Product>({
        list: getProducts,
        create: createProduct,
        update: updateProduct,
        remove: deleteProduct,

        messages: {
            loadError: "Erro ao buscar produtos do back-end",
            createError: "Erro ao cadastrar produto",
            updateError: "Erro ao atualizar produto",
            deleteError: "Erro ao excluir produto",
            confirmDelete: "Deseja realmente excluir este produto?",
        },
    });

    const filteredProducts = filterByNameAndStatus(
        products,
        searchTerm,
        statusFilter
    );

    return (
        <div className="page">
            <header className="page-header page-header-with-action">
                <div>
                    <h1>Produtos</h1>
                    <p>Gerencie os produtos cadastrados no sistema.</p>
                </div>

                {!showForm && (
                    <button className="new-button" onClick={openNewProductForm}>
                        Cadastrar novo produto
                    </button>
                )}
            </header>

            <main className={`content ${showForm ? "content-with-form" : "content-centered"}`}>
                {showForm && (
                    <section className="form-section">
                        <ProductForm
                            productToEdit={productToEdit}
                            onSaveProduct={handleSaveProduct}
                            onCancelEdit={closeForm}
                        />
                    </section>
                )}

                <section className="list-section">
                    <div className="list-header">
                        <div>
                            <h3>Produtos cadastrados</h3>
                            <p className="list-description">
                                {filteredProducts.length} produto(s) encontrado(s)
                            </p>
                        </div>

                        <div className="list-filters">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Buscar produto..."
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

                    {loading && <p>Carregando produtos...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!loading && !error && products.length === 0 && (
                        <div className="empty-state">
                            <strong>Nenhum produto cadastrado.</strong>
                            <span>Cadastre o primeiro produto usando o botão acima.</span>
                        </div>
                    )}

                    {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
                        <div className="empty-state">
                            <strong>Nenhum produto encontrado.</strong>
                            <span>Altere a busca ou o filtro de status.</span>
                        </div>
                    )}

                    <ul className="product-list">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="product-item">
                                <div className="product-card-header">
                                    <div>
                                        <strong>{product.name}</strong>
                                        <span>{product.description}</span>
                                    </div>
                                    <span className={`status-badge ${product.active !== false ? "active" : "inactive"}`}>
                                        {product.active !== false ? "Ativo" : "Inativo"}
                                    </span>
                                </div>

                                <div className="product-details">
                                    <div>
                                        <span className="detail-label">Preço</span>
                                        <span>R$ {product.price.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="detail-label">Unidade</span>
                                        <span>{product.unitOfMeasure || "Não informado"}</span>
                                    </div>
                                </div>

                                <div className="product-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => openEditProductForm(product)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            if (product.id !== undefined) {
                                                handleDeleteProduct(product.id);
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

export default Products;
