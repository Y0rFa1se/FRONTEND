export async function load() {
    const urls: string[] = [
        "https://y0rfa1se.duckdns.org/api/database/stock/tickers",
    ];

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