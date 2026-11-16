import type { Ingredient } from "../types/Ingredient";
import { useCrud } from "../hooks/useCrud";

import IngredientStats from "../components/ingredients/IngredientStats";
import IngredientCatalog from "../components/ingredients/IngredientCatalog";
import IngredientForm from "../components/ingredients/IngredientForm";

import {
    getIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
} from "../services/ingredientService";

function Ingredients() {

    const {
        items: ingredients,
        itemToEdit: ingredientToEdit,
        showForm,
        loading,
        error,
        openNewForm: openNewIngredientForm,
        openEditForm: openEditIngredientForm,
        closeForm,
        saveItem: handleSaveIngredient,
        deleteItem: handleDeleteIngredient,
    } = useCrud<Ingredient>({
        list: getIngredients,
        create: createIngredient,
        update: updateIngredient,
        remove: deleteIngredient,
        messages: {
            loadError: "Erro ao buscar matérias-primas do back-end",
            createError: "Erro ao cadastrar matéria-prima",
            updateError: "Erro ao atualizar matéria-prima",
            deleteError: "Erro ao excluir matéria-prima",
            confirmDelete: "Deseja realmente excluir esta matéria-prima?",
        },
    });

    return (
        <div className="page ingredients-page">

            <header className="page-header page-header-with-action ingredients-header">

                <div>
                    <span className="ingredients-kicker">
                        ESTOQUE / INSUMOS
                    </span>

                    <h1>Matérias-primas</h1>

                    <p>
                        Gerencie os insumos utilizados na produção e acompanhe
                        seus custos e quantidades mínimas.
                    </p>
                </div>

                {!showForm && (
                    <button
                        className="new-button"
                        onClick={openNewIngredientForm}
                    >
                        + Nova matéria-prima
                    </button>
                )}

            </header>

            {!loading && !error && (
                <IngredientStats ingredients={ingredients} />
            )}

            {showForm && (
                <section className="ingredient-form-panel">
                    <IngredientForm
                        ingredientToEdit={ingredientToEdit}
                        onSaveIngredient={handleSaveIngredient}
                        onCancelEdit={closeForm}
                    />
                </section>
            )}

            <IngredientCatalog
                ingredients={ingredients}
                loading={loading}
                error={error}
                onEdit={openEditIngredientForm}
                onDelete={handleDeleteIngredient}
            />

        </div>
    );
}

export default Ingredients;