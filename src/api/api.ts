interface FetchFunctionParams<T> {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: HeadersInit;
    body?: any;
    handler: (data: T) => void;
}

export const reusableFetchFunction = async <T>({
    url,
    method = "GET",
    headers = {},
    body,
    handler,
}: FetchFunctionParams<T>): Promise<void> => {
    try {
        const apiKey = process.env.REACT_APP_API_KEY;

        if (!apiKey) {
            throw new Error(
                "API_KEY is undefined. Please set it in your .env file."
            );
        }

        const finalHeaders: HeadersInit = {
            ...headers,
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
        };

        const response = await fetch(url, {
            method,
            headers: finalHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(`Fetch error: ${response.statusText}`);
        }

        const data: T = await response.json();
        handler(data);
    } catch (error) {
        console.error("Error in reusableFetchFunction:", error);
        handler([] as T);
    }
};
