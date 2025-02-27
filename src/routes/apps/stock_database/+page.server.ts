export async function load() {
    const response = await fetch("http://192.168.0.18:8000/database/stock/tickers");
    const tickers = await response.json();

    return { data: tickers };
}