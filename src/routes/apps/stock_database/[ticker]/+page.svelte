<script lang="ts">
    import { page } from "$app/state";

    const prices = page.data.data;
</script>

<h1>Prices</h1>

<table>
    <thead>
        <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
            <th>Dividends</th>
            <th>Stock Splits</th>
        </tr>
    </thead>
    <tbody>
        {#each prices as price}
            <tr>
                <td>{price.date}</td>
                <td>{price.open}</td>
                <td>{price.high}</td>
                <td>{price.low}</td>
                <td>{price.close}</td>
                <td>{price.volume}</td>
                <td>{price.dividends}</td>
                <td>{price.stock_splits}</td>
            </tr>
        {/each}
    </tbody>
</table>
