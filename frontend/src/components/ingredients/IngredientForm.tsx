import { useEffect, useState } from "react";
import type { Ingredient } from "../../types/Ingredient";

interface IngredientFormProps {
    ingredientToEdit: Ingredient | null;
    onSaveIngredient: (ingredient: Ingredient) => void;
    onCancelEdit: () => void;
}

const emptyIngredient: Ingredient = {
    name: "",
    unitOfMeasure: "",
    minimumQuantity: 0,
    cost: 0,
    active: true,
};

function IngredientForm({
    ingredientToEdit,
    onSaveIngredient,
    onCancelEdit,
}: IngredientFormProps) {

    const [ingredient, setIngredient] = useState<Ingredient>(emptyIngredient);

    useEffect(() => {
        setIngredient(
            ingredientToEdit
                ? { ...ingredientToEdit }
                : { ...emptyIngredient }
        );
    }, [ingredientToEdit]);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = event.target;

        setIngredient((current) => ({
            ...current,
            [name]:
                name === "minimumQuantity" || name === "cost"
                    ? Number(value)
                    : value,
        }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        onSaveIngredient(ingredient);
    }

    return (
        <form className="ingredient-form" onSubmit={handleSubmit}>

            <div className="ingredient-form-heading">
                <h3>
                    {ingredientToEdit
                        ? "Editar matéria-prima"
                        : "Nova matéria-prima"}
                </h3>

                <p>
                    Informe os dados da matéria-prima utilizada na produção.
                </p>
            </div>

            <div className="ingredient-form-grid">

                <label>
                    Nome da matéria-prima

                    <input
                        type="text"
                        name="name"
                        placeholder="Ex.: Farinha de trigo"
                        value={ingredient.name}
                        onChange={handleChange}
                        required
                        minLength={2}
                    />
                </label>

                <label>
                    Unidade de medida

                    <input
                        type="text"
                        name="unitOfMeasure"
                        placeholder="Ex.: kg, g, litros"
                        value={ingredient.unitOfMeasure}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Quantidade mínima

                    <input
                        type="number"
                        name="minimumQuantity"
                        min="0"
                        step="0.001"
                        value={ingredient.minimumQuantity ?? ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Custo cadastrado (R$)

                    <input
                        type="number"
                        name="cost"
                        min="0"
                        step="0.01"
                        value={ingredient.cost ?? ""}
                        onChange={handleChange}
                        required
                    />
                </label>

            </div>

            <label className="checkbox-field">
                <input
                    type="checkbox"
                    checked={ingredient.active ?? true}
                    onChange={(event) =>
                        setIngredient((current) => ({
                            ...current,
                            active: event.target.checked,
                        }))
                    }
                />

                Matéria-prima ativa
            </label>

            <div className="ingredient-form-actions">

                <button
                    type="submit"
                    className="ingredient-submit-button"
                >
                    {ingredientToEdit
                        ? "Atualizar matéria-prima"
                        : "Cadastrar matéria-prima"}
                </button>

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onCancelEdit}
                >
                    Cancelar
                </button>

            </div>

        </form>
    );
}

export default IngredientForm;