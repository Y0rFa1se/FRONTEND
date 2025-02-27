<script lang="ts">
    import { page } from "$app/state";

    const tickers = page.data.data;
</script>

<h1>tickers</h1>

<ul>
    {#each tickers as ticker}
        <li><a href="{ ticker.TABLE_NAME }">{ ticker.TABLE_NAME }({ ticker.TABLE_ROWS } datas)</a></li>
    {/each}
</ul>
