import { useState } from "react";
import type { Ingredient } from "../../types/Ingredient";
import {
    filterByNameAndStatus,
    type StatusFilter,
} from "../../utils/filterByNameAndStatus";

interface IngredientCatalogProps {
    ingredients: Ingredient[];
    loading: boolean;
    error: string;
    onEdit: (ingredient: Ingredient) => void;
    onDelete: (id: number) => void;
}

function IngredientCatalog({
    ingredients,
    loading,
    error,
    onEdit,
    onDelete,
}: IngredientCatalogProps) {

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    const filteredIngredients = filterByNameAndStatus(
            ingredients,
            searchTerm,
            statusFilter
    );


    function formatCost(cost: number | null | undefined) {
        if (cost == null) return "Não informado";

        return cost.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function formatMinimumQuantity(quantity: number | null | undefined) {
        if (quantity == null) return "Não informado";

        return `${quantity.toLocaleString("pt-BR")} `;
    }

    return (
        <section className="ingredient-catalog">

            <div className="ingredient-catalog-header">

                <div>
                    <span className="ingredients-kicker">
                        CADASTRO DE INSUMOS
                    </span>

                    <h2>Matérias-primas</h2>

                    <p>
                        {filteredIngredients.length} matéria(s)-prima(s) encontrada(s)
                    </p>
                </div>

                <div className="ingredient-catalog-filters">

                    <input
                        className="search-input ingredient-search"
                        type="text"
                        placeholder="Pesquisar matéria-prima..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                    <select
                        className="status-filter ingredient-status-filter"
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

            {loading && <p>Carregando matérias-primas...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && ingredients.length === 0 && (
                <div className="empty-state">
                    <strong>Nenhuma matéria-prima cadastrada.</strong>
                    <span>Cadastre os insumos utilizados pela empresa.</span>
                </div>
            )}

            {!loading && !error && ingredients.length > 0 && filteredIngredients.length === 0 && (
                <div className="empty-state">
                    <strong>Nenhuma matéria-prima encontrada.</strong>
                    <span>Altere a pesquisa ou o filtro de status.</span>
                </div>
            )}

            {!loading && !error && filteredIngredients.length > 0 && (
                <div className="ingredient-table-wrapper">

                    <table className="ingredient-table">

                        <thead>
                            <tr>
                                <th>Matéria-prima</th>
                                <th>Unidade</th>
                                <th>Estoque mínimo</th>
                                <th>Custo cadastrado</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredIngredients.map((ingredient) => {

                                const isActive = ingredient.active !== false;

                                return (
                                    <tr key={ingredient.id ?? ingredient.name}>

                                        <td>
                                            <strong>{ingredient.name}</strong>
                                            <span className="ingredient-id">
                                                ID: {ingredient.id ?? "—"}
                                            </span>
                                        </td>

                                        <td>{ingredient.unitOfMeasure}</td>

                                        <td>
                                            {formatMinimumQuantity(ingredient.minimumQuantity)}
                                            {ingredient.unitOfMeasure}
                                        </td>

                                        <td>
                                            {formatCost(ingredient.cost)}
                                        </td>

                                        <td>
                                            <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
                                                {isActive ? "Ativa" : "Inativa"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="ingredient-row-actions">

                                                <button
                                                    type="button"
                                                    className="ingredient-edit-button"
                                                    onClick={() => onEdit(ingredient)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="ingredient-delete-button"
                                                    disabled={ingredient.id === undefined}
                                                    onClick={() => {
                                                        if (ingredient.id !== undefined) {
                                                            onDelete(ingredient.id);
                                                        }
                                                    }}
                                                >
                                                    Excluir
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>

                </div>
            )}

        </section>
    );
}

export default IngredientCatalog;