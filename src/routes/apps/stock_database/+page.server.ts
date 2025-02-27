export async function load() {
    const urls: string[] = ["http://localhost:8003/database/stock/tickers", "http://localhost:8004/database/stock/tickers"];

    for (const url of urls) {
        try {
            const response = await fetch(url);
            const tickers = await response.json();

            return { data: tickers };
        } catch (error) {
            console.error(error);
        }
    }

    throw new Error("All fetch attempts failed");
}