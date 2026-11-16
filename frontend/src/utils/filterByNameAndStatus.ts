export type StatusFilter = "all" | "active" | "inactive";

interface FilterableItem {
    name: string;
    active?: boolean;
}

export function filterByNameAndStatus<T extends FilterableItem>(
    items: T[],
    searchTerm: string,
    statusFilter: StatusFilter
): T[] {

    return items.filter((item) => {

        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase());

        const isActive = item.active !== false;

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && isActive) ||
            (statusFilter === "inactive" && !isActive);

        return matchesSearch && matchesStatus;
    });
}