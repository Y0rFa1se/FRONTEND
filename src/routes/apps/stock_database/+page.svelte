<script lang="ts">
    import { onMount } from "svelte";

    let tickers: any;

    onMount(async () => {
        const base_url = import.meta.env.VITE_BASE_URL;

        // 쿠키에서 세션 ID 가져오기
        const cookies = document.cookie;
        console.log("Cookies:", cookies);

        const sessionCookie = cookies
            .split(";")
            .find((cookie) => cookie.trim().startsWith("session_id="));
        const sessionId = sessionCookie?.split("=")[1];

        console.log("Session ID:", sessionId);

        const url = base_url + "/database/stock/tickers?session_id=" + sessionId;
        const response = await fetch(url);
        const result = await response.json();

        tickers = result;
    });
</script>

<h1>tickers</h1>

<ul>
    {#each tickers as ticker}
        <li><a href="{ ticker.TABLE_NAME }">{ ticker.TABLE_NAME }({ ticker.TABLE_ROWS } datas)</a></li>
    {/each}
</ul>
