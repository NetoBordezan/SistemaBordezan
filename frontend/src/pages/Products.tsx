import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../services/productService";
import type { Product } from "../types/Product";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    function loadProducts() {
        setLoading(true);
        setError("");

        getProducts()
            .then((data) => setProducts(data))
            .catch((error) => {
                console.error(error);
                setError("Erro ao buscar produtos do back-end");
            })
            .finally(() => setLoading(false));
    }

    function openNewProductForm() {
        setProductToEdit(null);
        setShowForm(true);
    }

    function openEditProductForm(product: Product) {
        setProductToEdit(product);
        setShowForm(true);
    }

    function closeForm() {
        setProductToEdit(null);
        setShowForm(false);
    }

    function handleSaveProduct(product: Product) {
        if (product.id !== undefined) {
            updateProduct(product.id, product)
                .then((updatedProduct) => {
                    setProducts((current) =>
                        current.map((item) =>
                            item.id === updatedProduct.id ? updatedProduct : item
                        )
                    );
                    closeForm();
                })
                .catch((error) => {
                    console.error(error);
                    alert("Erro ao atualizar produto");
                });
            return;
        }

        createProduct(product)
            .then((createdProduct) => {
                setProducts((current) => [...current, createdProduct]);
                closeForm();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao cadastrar produto");
            });
    }

    function handleDeleteProduct(id: number) {
        if (!confirm("Deseja realmente excluir este produto?")) {
            return;
        }

        deleteProduct(id)
            .then(() => {
                setProducts((current) =>
                    current.filter((product) => product.id !== id)
                );

                if (productToEdit?.id === id) {
                    closeForm();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao excluir produto");
            });
    }

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && product.active) ||
            (statusFilter === "inactive" && !product.active);

        return matchesSearch && matchesStatus;
    });

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
                                    <span className={`status-badge ${product.active ? "active" : "inactive"}`}>
                                        {product.active ? "Ativo" : "Inativo"}
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
