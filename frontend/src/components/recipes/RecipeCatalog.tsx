import { useState } from "react";
import type { Recipe } from "../../types/Recipe";
import RecipeItem from "./RecipeItem";

interface RecipeCatalogProps {
    recipes: Recipe[];
    loading: boolean;
    error: string;
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: number) => void;
}

function RecipeCatalog({
    recipes,
    loading,
    error,
    onEdit,
    onDelete,
}: RecipeCatalogProps) {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "active" | "inactive"
    >("all");

    const [expandedRecipeKey, setExpandedRecipeKey] = useState<string | null>(null);

    const filteredRecipes = recipes.filter((recipe) => {

        const matchesSearch = recipe.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const isActive = recipe.active !== false;

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && isActive) ||
            (statusFilter === "inactive" && !isActive);

        return matchesSearch && matchesStatus;
    });

        return (
        <section className="recipe-catalog">

            <div className="recipe-catalog-header">
                <div>
                    <span className="recipes-eyebrow">Biblioteca</span>
                    <h2>Catálogo de receitas</h2>

                    <p>
                        {filteredRecipes.length} ficha(s) encontrada(s)
                    </p>
                </div>

                <div className="recipe-catalog-filters">

                    <input
                        className="search-input recipe-search"
                        type="text"
                        placeholder="Pesquisar ficha técnica..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                    <select
                        className="status-filter recipe-status-filter"
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value as "all" | "active" | "inactive"
                            )
                        }
                    >
                        <option value="all">Todos os status</option>
                        <option value="active">Ativas</option>
                        <option value="inactive">Inativas</option>
                    </select>

                </div>
            </div>

            {loading && <p>Carregando fichas técnicas...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && recipes.length === 0 && (
                <div className="empty-state">
                    <strong>Nenhuma ficha técnica cadastrada.</strong>
                    <span>Cadastre a primeira ficha técnica para começar.</span>
                </div>
            )}

            {!loading && !error && recipes.length > 0 && filteredRecipes.length === 0 && (
                <div className="empty-state">
                    <strong>Nenhuma ficha técnica encontrada.</strong>
                    <span>Altere a pesquisa ou o filtro de status.</span>
                </div>
            )}

            {!loading && !error && filteredRecipes.length > 0 && (
                <ul className="recipe-catalog-list">

                    {filteredRecipes.map((recipe) => {

                        const recipeKey = String(recipe.id ?? recipe.name);

                        return (
                            <RecipeItem
                                key={recipeKey}
                                recipe={recipe}
                                isExpanded={expandedRecipeKey === recipeKey}
                                onToggleDetails={() =>
                                    setExpandedRecipeKey(
                                        expandedRecipeKey === recipeKey
                                            ? null
                                            : recipeKey
                                    )
                                }
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        );
                    })}

                </ul>
            )}

        </section>
    );
}

export default RecipeCatalog;