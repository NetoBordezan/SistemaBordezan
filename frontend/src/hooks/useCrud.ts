import { useCallback, useEffect, useState } from "react";

//Esse hook evita a repetição das mesmas funções básicas de crud em todas as páginas, além de dar uma optimizada através do useCallback tbm (:

interface CrudEntity {
    id?: number;
}

interface CrudMessages {
    loadError: string;
    createError: string;
    updateError: string;
    deleteError: string;
    confirmDelete: string;
}

interface UseCrudOptions<T extends CrudEntity> {
    list: () => Promise<T[]>;
    create: (item: T) => Promise<T>;
    update: (id: number, item: T) => Promise<T>;
    remove: (id: number) => Promise<void>;
    messages: CrudMessages;
}

export function useCrud<T extends CrudEntity>({
    list,
    create,
    update,
    remove,
    messages,
}: UseCrudOptions<T>) {

    const [items, setItems] = useState<T[]>([]);
    const [itemToEdit, setItemToEdit] = useState<T | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadItems = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await list();
            setItems(data);
        } catch (error) {
            console.error(error);
            setError(messages.loadError);
        } finally {
            setLoading(false);
        }
    }, [list, messages.loadError]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    function openNewForm() {
        setItemToEdit(null);
        setShowForm(true);
    }

    function openEditForm(item: T) {
        setItemToEdit(item);
        setShowForm(true);
    }

    function closeForm() {
        setItemToEdit(null);
        setShowForm(false);
    }

    async function saveItem(item: T) {

        try {
            if (item.id !== undefined) {
                const id = item.id;

                const updatedItem = await update(id, item);

                setItems((current) =>
                    current.map((currentItem) =>
                        currentItem.id === id
                            ? { ...updatedItem, id }
                            : currentItem
                    )
                );

            } else {
                const createdItem = await create(item);

                setItems((current) => [...current, createdItem]);
            }

            closeForm();

        } catch (error) {
            console.error(error);

            alert(
                item.id !== undefined
                    ? messages.updateError
                    : messages.createError
            );
        }
    }

    async function deleteItem(id: number) {

        if (!window.confirm(messages.confirmDelete)) {
            return;
        }

        try {
            await remove(id);

            setItems((current) =>
                current.filter((item) => item.id !== id)
            );

            if (itemToEdit?.id === id) {
                closeForm();
            }

        } catch (error) {
            console.error(error);
            alert(messages.deleteError);
        }
    }

    return {
        items,
        itemToEdit,
        showForm,
        loading,
        error,

        openNewForm,
        openEditForm,
        closeForm,

        saveItem,
        deleteItem,
        reload: loadItems,
    };
}