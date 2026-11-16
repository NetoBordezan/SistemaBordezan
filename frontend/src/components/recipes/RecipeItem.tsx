import type { Recipe } from "../../types/Recipe";

interface RecipeItemProps {
    recipe: Recipe;
    isExpanded: boolean;
    onToggleDetails: () => void;
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: number) => void;
}

function RecipeItem({
    recipe,
    isExpanded,
    onToggleDetails,
    onEdit,
    onDelete,
}: RecipeItemProps) {

    const isActive = recipe.active !== false;

    return (
        <li className="recipe-row">

            <div className="recipe-row-main">

                <div className="recipe-identity">
                    <span className="recipe-code">
                        FICHA TÉCNICA Nº {recipe.id ?? "—"}
                    </span>

                    <h3>{recipe.name}</h3>

                    <p>
                        {recipe.preparationMethod ||
                            "Modo de preparo não informado"}
                    </p>
                </div>

                <div className="recipe-metadata">

                    <div className="recipe-metric">
                        <span>Rendimento</span>
                        <strong>
                            {recipe.yield} {recipe.unitOfMeasure}
                        </strong>
                    </div>

                    <div className="recipe-metric">
                        <span>Tempo de preparo</span>
                        <strong>
                            {recipe.preparationTime} {recipe.unitOfTime}
                        </strong>
                    </div>

                </div>

                <div className="recipe-row-side">

                    <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
                        {isActive ? "Ativa" : "Inativa"}
                    </span>

                    <div className="recipe-row-actions">

                        <button
                            type="button"
                            className="recipe-view-button"
                            aria-expanded={isExpanded}
                            onClick={onToggleDetails}
                        >
                            {isExpanded ? "Ocultar ↑" : "Detalhes ↓"}
                        </button>

                        <button
                            type="button"
                            className="recipe-edit-button"
                            onClick={() => onEdit(recipe)}
                        >
                            Editar
                        </button>

                        <button
                            type="button"
                            className="recipe-delete-button"
                            disabled={recipe.id === undefined}
                            onClick={() => {
                                if (recipe.id !== undefined) {
                                    onDelete(recipe.id);
                                }
                            }}
                        >
                            Excluir
                        </button>

                    </div>

                </div>

            </div>

            {isExpanded && (
                <div className="recipe-expanded-details">

                    <h4>Modo de preparo</h4>

                    <p>
                        {recipe.preparationMethod ||
                            "Modo de preparo não informado."}
                    </p>
                    
                    <div className="recipe-detail-ingredients">

                        <div className="recipe-detail-ingredients-header">
                            <h4>Matérias-primas utilizadas</h4>

                            <span>
                                {recipe.recipeIngredients?.length ?? 0} item(ns)
                            </span>
                        </div>

                        {recipe.recipeIngredients && recipe.recipeIngredients.length > 0 ? (

                            <ul className="recipe-detail-ingredients-list">

                                {recipe.recipeIngredients.map((item, index) => (

                                    <li
                                        key={item.id ?? item.ingredient.id ?? index}
                                        className="recipe-detail-ingredient"
                                    >
                                        <div>
                                            <strong>{item.ingredient.name}</strong>

                                            <span>
                                                {item.ingredient.unitOfMeasure}
                                            </span>
                                        </div>

                                        <strong>
                                            {item.quantity.toLocaleString("pt-BR")}{" "}
                                            {item.ingredient.unitOfMeasure}
                                        </strong>

                                    </li>

                                ))}

                            </ul>

                        ) : (

                            <p className="recipe-detail-ingredients-empty">
                                Nenhuma matéria-prima associada a esta ficha técnica.
                            </p>

                        )}

                    </div>

                    <div className="recipe-extra-info">

                        <span>
                            Criada em:{" "}
                            {recipe.createdAt
                                ? new Date(recipe.createdAt).toLocaleDateString("pt-BR")
                                : "Não informado"}
                        </span>

                        <span>
                            Última atualização:{" "}
                            {recipe.updatedAt
                                ? new Date(recipe.updatedAt).toLocaleDateString("pt-BR")
                                : "Não informado"}
                        </span>

                    </div>

                </div>
            )}

        </li>
    );
}

export default RecipeItem;