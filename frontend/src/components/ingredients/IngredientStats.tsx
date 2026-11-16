import type { Ingredient } from "../../types/Ingredient";

interface IngredientStatsProps {
    ingredients: Ingredient[];
}

function IngredientStats({ ingredients }: IngredientStatsProps) {

    const total = ingredients.length;

    const active = ingredients.filter(
        (ingredient) => ingredient.active !== false
    ).length;

    const inactive = ingredients.filter(
        (ingredient) => ingredient.active === false
    ).length;

    return (
        <section className="ingredients-overview">

            <div className="ingredients-overview-total">
                <span className="ingredients-kicker">
                    BASE DE INSUMOS
                </span>

                <strong>{total}</strong>

                <p>Matérias-primas cadastradas</p>
            </div>

            <div className="ingredients-overview-status">

                <div className="ingredient-status-summary">
                    <span className="ingredient-status-dot active-dot" />

                    <div>
                        <span>Matérias-primas ativas</span>
                        <strong>{active}</strong>
                    </div>
                </div>

                <div className="ingredient-status-summary">
                    <span className="ingredient-status-dot inactive-dot" />

                    <div>
                        <span>Matérias-primas inativas</span>
                        <strong>{inactive}</strong>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default IngredientStats;