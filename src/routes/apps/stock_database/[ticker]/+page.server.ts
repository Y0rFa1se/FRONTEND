export async function load({ params }) {
    const ticker = params.ticker;

    const response = await fetch("http://192.168.0.18:8000/database/stock/prices/" + ticker);
    const prices = await response.json();

    console.log(prices);

    return { data: prices };
}