export async function load() {
    const response = await fetch("http://127.0.0.1:8000/database/stock/tickers");
    const tickers = await response.json();

    return { data: tickers };
}