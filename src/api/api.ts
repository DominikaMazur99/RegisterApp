import { IFormData } from "../interfaces/interfaces";

interface FetchFunctionParams<T> {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: HeadersInit;
    body?: any;
    handler: (data: T) => void;
}

interface SubmitFormParams {
    url: string;
    formData: IFormData;
    handler: (response: any) => void;
}

const reusableFetchFunction = async <T>({
    url,
    method = "GET",
    headers = {},
    body,
    handler,
}: FetchFunctionParams<T>): Promise<void> => {
    try {
        const apiKey = "jLRG8GyCMYw2BJkIWF7S4w==WuRlBupy7vgLLXvV";

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

const submitFormFunction = async ({
    url,
    formData,
    handler,
}: SubmitFormParams): Promise<void> => {
    try {
        const processedFormData = {
            ...formData,
            date: formData.date
                ? new Date(formData.date).toISOString().split("T")[0]
                : null,
        };

        const body = JSON.stringify(processedFormData);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        handler(data);
    } catch (error) {
        console.error("Error in submitFormFunction:", error);
        handler({ error: "Failed to submit form" });
    }
};

export { reusableFetchFunction, submitFormFunction };
