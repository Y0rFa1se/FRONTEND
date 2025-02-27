export async function load({ params }) {
    const ticker = params.ticker;
    const urls = ["http://192.168.0.18:8003/database/stock/prices" + ticker, "http://192.168.0.18:8004/database/stock/prices" + ticker];

    for (const url of urls) {
        try {
            const response = await fetch(url);
            const prices = await response.json();

            console.log(prices);

            return { data: prices };
        } catch (error) {
            console.error(error);
        }
    }

    throw new Error("All fetch attempts failed");
}