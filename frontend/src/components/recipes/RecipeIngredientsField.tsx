import { useEffect, useState } from "react";

import type { Ingredient } from "../../types/Ingredient";
import type { RecipeIngredient } from "../../types/RecipeIngredient";

import RecipeIngredientItem from "./RecipeIngredientItem";

import { getIngredients } from "../../services/ingredientService";

interface RecipeIngredientsFieldProps {
    recipeIngredients: RecipeIngredient[];
    onChange: (ingredients: RecipeIngredient[]) => void;
}

function RecipeIngredientsField({
    recipeIngredients,
    onChange,
}: RecipeIngredientsFieldProps) {

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const [selectedIngredientId, setSelectedIngredientId] = useState("");
    const [quantity, setQuantity] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {

        async function loadIngredients() {
            try {
                const data = await getIngredients();
                setIngredients(data);
            } catch (error) {
                console.error(error);
                setError("Não foi possível carregar as matérias-primas.");
            } finally {
                setLoading(false);
            }
        }

        loadIngredients();

    }, []);

    function handleAddIngredient() {

        const ingredientId = Number(selectedIngredientId);
        const selectedIngredient = ingredients.find(
            (ingredient) => ingredient.id === ingredientId
        );

        const parsedQuantity = Number(quantity);

        if (
            !selectedIngredient ||
            selectedIngredient.active === false ||
            !Number.isFinite(parsedQuantity) ||
            parsedQuantity <= 0
        ) {
            setError("Selecione uma matéria-prima ativa e informe uma quantidade válida.");
            return;
        }

        const alreadyAdded = recipeIngredients.some(
            (item) => item.ingredient.id === selectedIngredient.id
        );

        if (alreadyAdded) {
            setError("Essa matéria-prima já foi adicionada à ficha técnica.");
            return;
        }

        onChange([
            ...recipeIngredients,
            {
                quantity: parsedQuantity,
                ingredient: selectedIngredient,
            },
        ]);

        setSelectedIngredientId("");
        setQuantity("");
        setError("");
    }

    function handleRemoveIngredient(ingredientId: number) {

        onChange(
            recipeIngredients.filter(
                (item) => item.ingredient.id !== ingredientId
            )
        );
    }

    return (
        <section className="recipe-ingredients-field">

            <div className="recipe-ingredients-heading">
                <h3>Composição da ficha técnica</h3>

                <p>
                    Selecione as matérias-primas utilizadas na produção
                    e informe suas quantidades.
                </p>
            </div>

            <div className="recipe-ingredient-controls">

                <label>
                    Matéria-prima

                    <select
                        value={selectedIngredientId}
                        onChange={(event) =>
                            setSelectedIngredientId(event.target.value)
                        }
                        disabled={loading}
                    >
                        <option value="">
                            {loading
                                ? "Carregando matérias-primas..."
                                : "Selecione uma matéria-prima"}
                        </option>

                        {ingredients
                            .filter((ingredient) => ingredient.active !== false)
                            .map((ingredient) => (
                                <option
                                    key={ingredient.id}
                                    value={ingredient.id}
                                    disabled={recipeIngredients.some(
                                        (item) => item.ingredient.id === ingredient.id
                                    )}
                                >
                                    {ingredient.name} ({ingredient.unitOfMeasure})
                                </option>
                            ))}
                    </select>
                </label>

                <label>
                    Quantidade utilizada

                    <input
                        type="number"
                        min="0.001"
                        step="0.001"
                        placeholder="Ex.: 5"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                    />
                </label>

                <button
                    type="button"
                    className="recipe-add-ingredient-button"
                    onClick={handleAddIngredient}
                    disabled={loading || !selectedIngredientId || !quantity}
                >
                    + Adicionar
                </button>

            </div>

            {error && (
                <p className="error-message">{error}</p>
            )}

            {ingredients.length === 0 && !loading && !error && (
                <div className="empty-state">
                    <strong>Nenhuma matéria-prima disponível.</strong>
                    <span>Cadastre matérias-primas antes de montar a composição.</span>
                </div>
            )}

            <div className="recipe-ingredients-list">

                <div className="recipe-ingredients-list-header">
                    <strong>Matérias-primas adicionadas</strong>

                    <span>
                        {recipeIngredients.length} item(ns)
                    </span>
                </div>

                {recipeIngredients.length === 0 ? (
                    <p className="recipe-ingredients-empty">
                        Nenhuma matéria-prima adicionada à ficha técnica.
                    </p>
                ) : (
                    recipeIngredients.map((item) => (
                        <RecipeIngredientItem
                            key={item.ingredient.id}
                            item={item}
                            onRemove={() =>
                                item.ingredient.id !== undefined &&
                                handleRemoveIngredient(item.ingredient.id)
                            }
                        />
                    ))
                )}

            </div>

        </section>
    );
}

export default RecipeIngredientsField;