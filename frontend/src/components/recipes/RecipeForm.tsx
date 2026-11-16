import { useEffect, useState } from "react";
import type { Recipe } from "../../types/Recipe";
import RecipeIngredientsField from "./RecipeIngredientsField";

interface RecipeFormProps {
    recipeToEdit: Recipe | null;
    onSaveRecipe: (recipe: Recipe) => void;
    onCancelEdit: () => void;
}

const emptyRecipe: Recipe = {
    name: "",
    yield: 0,
    unitOfMeasure: "",
    preparationMethod: "",
    preparationTime: 0,
    unitOfTime: "minutos",
    recipeIngredients: [],
    active: true,
};

function RecipeForm({
    recipeToEdit,
    onSaveRecipe,
    onCancelEdit,
}: RecipeFormProps) {

    const [recipe, setRecipe] = useState<Recipe>(emptyRecipe);

    useEffect(() => {
        setRecipe(
            recipeToEdit
                ? {
                    ...recipeToEdit,
                    recipeIngredients: recipeToEdit.recipeIngredients ?? [],
                }
                : { ...emptyRecipe }
        );
    }, [recipeToEdit]);

        function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setRecipe((current) => ({
            ...current,
            [name]:
                name === "yield" || name === "preparationTime"
                    ? Number(value)
                    : value,
        }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        onSaveRecipe(recipe);
    }

    function handleCancel() {
        setRecipe({ ...emptyRecipe });
        onCancelEdit();
    }

        return (
        <form className="recipe-form" onSubmit={handleSubmit}>

            <div className="recipe-form-heading">
                <h3>
                    {recipeToEdit ? "Editar ficha técnica" : "Nova ficha técnica"}
                </h3>
                <p>Preencha as informações da receita e do processo de produção.</p>
            </div>

            <div className="recipe-form-grid">

                <label>
                    Nome da ficha técnica
                    <input
                        type="text"
                        name="name"
                        placeholder="Ex.: Pão Francês"
                        value={recipe.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Rendimento
                    <input
                        type="number"
                        name="yield"
                        min="0.01"
                        step="0.01"
                        value={recipe.yield || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Unidade de medida do rendimento
                    <input
                        type="text"
                        name="unitOfMeasure"
                        placeholder="Ex.: unidades, kg, litros"
                        value={recipe.unitOfMeasure}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Tempo de preparo
                    <input
                        type="number"
                        name="preparationTime"
                        min="1"
                        step="1"
                        value={recipe.preparationTime || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Unidade de tempo
                    <input
                        type="text"
                        name="unitOfTime"
                        placeholder="Ex.: minutos, horas"
                        value={recipe.unitOfTime}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="recipe-preparation-field">
                    Modo de preparo
                    <textarea
                        name="preparationMethod"
                        rows={5}
                        placeholder="Descreva as etapas de preparação..."
                        value={recipe.preparationMethod}
                        onChange={handleChange}
                        required
                    />
                </label>

            </div>

            <RecipeIngredientsField
                recipeIngredients={recipe.recipeIngredients ?? []}
                onChange={(ingredients) =>
                    setRecipe((current) => ({
                        ...current,
                        recipeIngredients: ingredients,
                    }))
                }
            />

            <label className="checkbox-field">
                <input
                    type="checkbox"
                    checked={recipe.active ?? true}
                    onChange={(event) =>
                        setRecipe((current) => ({
                            ...current,
                            active: event.target.checked,
                        }))
                    }
                />
                Ficha técnica ativa
            </label>

            <div className="recipe-form-actions">
                <button type="submit" className="recipe-submit-button">
                    {recipeToEdit ? "Atualizar ficha técnica" : "Cadastrar ficha técnica"}
                </button>

                <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
            </div>

        </form>
    );
}

export default RecipeForm;