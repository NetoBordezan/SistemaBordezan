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

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page">
            <header className="page-header">
                <div>
                    <h1>Produtos</h1>
                    <p>Gerencie os produtos cadastrados no sistema.</p>
                </div>
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
                    {!showForm && (
                        <button className="new-button" onClick={openNewProductForm}>
                            + Cadastrar novo produto
                        </button>
                    )}

                    <div className="list-header">
                        <h3>Produtos cadastrados</h3>
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Buscar produto..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>

                    {loading && <p>Carregando produtos...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!loading && !error && products.length === 0 && (
                        <p>Nenhum produto cadastrado.</p>
                    )}

                    {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
                        <p>Nenhum produto encontrado.</p>
                    )}

                    <ul className="product-list">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="product-item">
                                <div className="product-info">
                                    <strong>{product.name}</strong>
                                    <span>Descrição: {product.description}</span>
                                    <span>Preço: R$ {product.price.toFixed(2)}</span>
                                    <span>Unidade: {product.unitOfMeasure}</span>
                                    <span>Status: {product.active ? "Ativo" : "Inativo"}</span>
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
