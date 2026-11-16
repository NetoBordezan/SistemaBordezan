import { useCrud } from "../hooks/useCrud";
import type { Recipe } from "../types/Recipe";
import RecipeStats from "../components/recipes/RecipeStats";
import RecipeForm from "../components/recipes/RecipeForm";
import RecipeCatalog from "../components/recipes/RecipeCatalog";

import {
    createRecipe,
    deleteRecipe,
    getRecipes,
    updateRecipe,
} from "../services/recipeService";

function Recipes() {
    const {
        items: recipes,
        itemToEdit: recipeToEdit,
        showForm,
        loading,
        error,

        openNewForm: openNewRecipeForm,
        openEditForm: openEditRecipeForm,
        closeForm,

        saveItem: handleSaveRecipe,
        deleteItem: handleDeleteRecipe,
    } = useCrud<Recipe>({
        list: getRecipes,
        create: createRecipe,
        update: updateRecipe,
        remove: deleteRecipe,

        messages: {
            loadError: "Erro ao buscar fichas técnicas do back-end",
            createError: "Erro ao cadastrar ficha técnica",
            updateError: "Erro ao atualizar ficha técnica",
            deleteError: "Erro ao excluir ficha técnica",
            confirmDelete: "Deseja realmente excluir esta ficha técnica?",
        },
});


        return (
            <div className="page recipes-page">

                <header className="page-header page-header-with-action recipes-header">
                    <div>
                        <span className="recipes-eyebrow">
                            Produção / Receitas
                        </span>

                        <h1>Fichas Técnicas</h1>

                        <p>
                            Gerencie as fichas técnicas e os processos de produção.
                        </p>
                    </div>
                    {!showForm && (
                        <button className="new-button" onClick={openNewRecipeForm}>
                            + Nova ficha técnica
                        </button>
                    )}
                </header>

                <RecipeStats recipes={recipes} />

                {showForm && (
                    <section className="recipe-form-panel">
                        <RecipeForm
                            recipeToEdit={recipeToEdit}
                            onSaveRecipe={handleSaveRecipe}
                            onCancelEdit={closeForm}
                        />
                    </section>
                )}

                <RecipeCatalog
                    recipes={recipes}
                    loading={loading}
                    error={error}
                    onEdit={openEditRecipeForm}
                    onDelete={handleDeleteRecipe}
                />
            </div>
    );
}

export default Recipes;