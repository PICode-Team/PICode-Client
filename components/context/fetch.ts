interface IFetchData {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    body?: string;
    headers: boolean;
}

export async function fetchSet({ method, url, body, headers }: IFetchData) {
    let fetchOption: {
        method: string;
        body?: string;
        headers?: { [key: string]: string };
    } = {
        method: method,
    };
    if (body) {
        fetchOption.body = body;
    }
    if (headers) {
        fetchOption.headers = {
            "Content-Type": "application/json",
        };
    }
    let result = await fetch(`/api${url}`, fetchOption).then((res) =>
        res.json()
    );
    return result;
}
