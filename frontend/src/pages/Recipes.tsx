import { useEffect, useState } from "react";
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
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        getRecipes()
            .then((data) => setRecipes(data))
            .catch((error) => {
                console.error(error);
                setError("Erro ao buscar fichas técnicas do back-end");
            })
            .finally(() => setLoading(false));
    }, []);

    function openNewRecipeForm() {
        setRecipeToEdit(null);
        setShowForm(true);
    }

    function openEditRecipeForm(recipe: Recipe) {
        setRecipeToEdit(recipe);
        setShowForm(true);
    }

    function closeForm() {
        setRecipeToEdit(null);
        setShowForm(false);
    }
    function handleSaveRecipe(recipe: Recipe) {

        // Atualização
        if (recipe.id !== undefined) {
            const id = recipe.id;

            updateRecipe(id, recipe)
                .then((updatedRecipe) => {
                    setRecipes((current) =>
                        current.map((item) =>
                            item.id === id
                                ? { ...updatedRecipe, id }
                                : item
                        )
                    );

                    closeForm();
                })
                .catch((error) => {
                    console.error(error);
                    alert("Erro ao atualizar ficha técnica");
                });

            return;
        }

        createRecipe(recipe)
            .then((createdRecipe) => {
                setRecipes((current) => [...current, createdRecipe]);
                closeForm();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao cadastrar ficha técnica");
            });
    }
    function handleDeleteRecipe(id: number) {

        if (!confirm("Deseja realmente excluir esta ficha técnica?")) {
            return;
        }

        deleteRecipe(id)
            .then(() => {
                setRecipes((current) =>
                    current.filter((recipe) => recipe.id !== id)
                );

                if (recipeToEdit?.id === id) {
                    closeForm();
                }

            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao excluir ficha técnica");
            });
    }


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