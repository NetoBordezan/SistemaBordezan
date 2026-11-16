type ApiRequestOptions = Omit<RequestInit, "headers"> & {
    headers?: HeadersInit;
};

const API_BASE_URL = (
    import.meta.env.VITE_API_URL
).replace(/\/$/, "");

export async function apiRequest<T>(
    endpoint: string,
    options: ApiRequestOptions = {},
    errorMessage = "Erro ao comunicar com o servidor"
): Promise<T> {

    const headers = new Headers(options.headers);

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`${errorMessage} (HTTP ${response.status})`);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const responseBody = await response.text();

    if (!responseBody.trim()) {
        return undefined as T;
    }

    try {
        return JSON.parse(responseBody) as T;
    } catch {
        throw new Error("O servidor retornou uma resposta inválida.");
    }
}