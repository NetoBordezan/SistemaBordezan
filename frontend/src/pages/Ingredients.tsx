import { useEffect, useState } from "react";

import type { Ingredient } from "../types/Ingredient";

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

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientToEdit, setIngredientToEdit] = useState<Ingredient | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadIngredients() {
            try {
                const data = await getIngredients();
                setIngredients(data);
            } catch (error) {
                console.error(error);
                setError("Erro ao buscar matérias-primas do back-end");
            } finally {
                setLoading(false);
            }
        }

        loadIngredients();

    }, []);

    function openNewIngredientForm() {
        setIngredientToEdit(null);
        setShowForm(true);
    }

    function openEditIngredientForm(ingredient: Ingredient) {
        setIngredientToEdit(ingredient);
        setShowForm(true);
    }

    function closeForm() {
        setIngredientToEdit(null);
        setShowForm(false);
    }

    function handleSaveIngredient(ingredient: Ingredient) {

        if (ingredient.id !== undefined) {
            const id = ingredient.id;

            updateIngredient(id, ingredient)
                .then((updatedIngredient) => {
                    setIngredients((current) =>
                        current.map((item) =>
                            item.id === id ? updatedIngredient : item
                        )
                    );

                    closeForm();
                })
                .catch((error) => {
                    console.error(error);
                    alert("Erro ao atualizar matéria-prima");
                });

            return;
        }

        createIngredient(ingredient)
            .then((createdIngredient) => {
                setIngredients((current) => [...current, createdIngredient]);
                closeForm();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao cadastrar matéria-prima");
            });
    }

    function handleDeleteIngredient(id: number) {

        if (!confirm("Deseja realmente excluir esta matéria-prima?")) {
            return;
        }

        deleteIngredient(id)
            .then(() => {
                setIngredients((current) =>
                    current.filter((ingredient) => ingredient.id !== id)
                );

                if (ingredientToEdit?.id === id) {
                    closeForm();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao excluir matéria-prima");
            });
    }

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