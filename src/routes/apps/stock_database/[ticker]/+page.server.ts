export async function load({ params }) {
    const ticker = params.ticker;
    const urls = ["http://localhost:8003/database/stock/prices" + ticker, "http://localhost:8004/database/stock/prices" + ticker];

    for (const url of urls) {
        try {
            const response = await fetch(url);
            const prices = await response.json();

            return { data: prices };
        } catch (error) {
            console.error(error);
        }
    }

    throw new Error("All fetch attempts failed");
}