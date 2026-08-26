import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

interface ProductFormProps {
    productToEdit: Product | null;
    onSaveProduct: (product: Product) => void;
    onCancelEdit: () => void;
}

const emptyProduct: Product = {
    name: "",
    description: "",
    price: 0,
    unitOfMeasure: "",
    active: true,
};

function ProductForm({ productToEdit, onSaveProduct, onCancelEdit }: ProductFormProps) {
    const [product, setProduct] = useState<Product>(emptyProduct);

    useEffect(() => {
        setProduct(productToEdit ?? emptyProduct);
    }, [productToEdit]);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setProduct((current) => ({
            ...current,
            [name]: name === "price" ? Number(value) : value,
        }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        onSaveProduct(product);

        if (!productToEdit) {
            setProduct(emptyProduct);
        }
    }

    function handleCancel() {
        setProduct(emptyProduct);
        onCancelEdit();
    }

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h3>{productToEdit ? "Editar Produto" : "Novo Produto"}</h3>

            <input
                type="text"
                name="name"
                placeholder="Nome do produto"
                value={product.name}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Descrição do produto"
                value={product.description}
                onChange={handleChange}
                required
                rows={4}
            />

            <input
                type="number"
                name="price"
                placeholder="Preço"
                min="0"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="unitOfMeasure"
                placeholder="Unidade de medida"
                value={product.unitOfMeasure}
                onChange={handleChange}
                required
            />

            <label className="checkbox-field">
                <input
                    type="checkbox"
                    checked={product.active ?? true}
                    onChange={(event) =>
                        setProduct((current) => ({
                            ...current,
                            active: event.target.checked,
                        }))
                    }
                />
                Produto ativo
            </label>

            <button type="submit">
                {productToEdit ? "Atualizar" : "Cadastrar"}
            </button>

            <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancelar
            </button>
        </form>
    );
}

export default ProductForm;
