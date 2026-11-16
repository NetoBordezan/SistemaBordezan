import type { RecipeIngredient } from "../../types/RecipeIngredient";

interface RecipeIngredientItemProps {
    item: RecipeIngredient;
    onRemove: () => void;
}

function RecipeIngredientItem({
    item,
    onRemove,
}: RecipeIngredientItemProps) {

    return (
        <div className="recipe-ingredient-item">

            <div className="recipe-ingredient-info">
                <strong>{item.ingredient.name}</strong>

                <span>
                    {item.quantity.toLocaleString("pt-BR")}{" "}
                    {item.ingredient.unitOfMeasure}
                </span>
            </div>

            <button
                type="button"
                className="recipe-ingredient-remove"
                onClick={onRemove}
                aria-label={`Remover ${item.ingredient.name}`}
            >
                Remover
            </button>

        </div>
    );
}

export default RecipeIngredientItem;