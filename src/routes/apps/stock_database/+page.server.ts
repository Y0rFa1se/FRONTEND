export async function load() {
    const urls: string[] = ["http://192.168.0.18:8003/database/stock/tickers", "http://192.168.0.18:8004/database/stock/tickers"];

    for (const url of urls) {
        try {
            const response = await fetch(url);
            const tickers = await response.json();

            console.log(tickers);

            return { data: tickers };
        } catch (error) {
            console.error(error);
        }
    }

    throw new Error("All fetch attempts failed");
}