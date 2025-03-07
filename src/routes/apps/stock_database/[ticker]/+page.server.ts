export async function load({ params }) {
    const ticker = params.ticker;
    const urls = [
        "https://y0rfa1se.duckdns.org/api/database/stock/prices/" + ticker,
    ];

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