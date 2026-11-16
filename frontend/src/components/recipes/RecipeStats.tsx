import type { Recipe } from "../../types/Recipe";

interface RecipeStatsProps {
    recipes: Recipe[];
}

function RecipeStats({ recipes }: RecipeStatsProps) {

    const totalRecipes = recipes.length;

    const activeRecipes = recipes.filter(
        (recipe) => recipe.active !== false
    ).length;

    const inactiveRecipes = recipes.filter(
        (recipe) => recipe.active === false
    ).length;

    return (
        <section className="recipes-overview">

            <div className="recipes-overview-heading">
                <h2>Visão geral</h2>
            </div>

            <div className="recipes-stats">

                <div className="recipe-stat-card">
                    <div>
                        <span>Fichas cadastradas</span>
                        <strong>{totalRecipes}</strong>
                    </div>

                    <div className="recipe-stat-icon">▤</div>
                </div>

                <div className="recipe-stat-card">
                    <div>
                        <span>Fichas ativas</span>
                        <strong>{activeRecipes}</strong>
                    </div>

                    <div className="recipe-stat-icon">✓</div>
                </div>

                <div className="recipe-stat-card">
                    <div>
                        <span>Fichas inativas</span>
                        <strong>{inactiveRecipes}</strong>
                    </div>

                    <div className="recipe-stat-icon">×</div>
                </div>

            </div>
        </section>
    );
}

export default RecipeStats;