export async function load({ params }) {
    const ticker = params.ticker;
    
    return { data: ticker };
}