<script lang="ts">
    import { page } from "$app/state";

    let prices: any;

    const ticker = page.data.data;
    console.log(ticker);

    // 쿠키에서 세션 ID 가져오기
    const cookies = document.cookie;
    console.log("Cookies:", cookies);

    const sessionCookie = cookies
        .split(";")
        .find((cookie) => cookie.trim().startsWith("session_id="));
    const sessionId = sessionCookie?.split("=")[1];

    console.log("Session ID:", sessionId);

    // 비동기 함수로 API 호출 및 처리
    async function checkSessions() {
        const url = `https://y0rfa1se.duckdns.org/api/database/stock/prices/${ticker}?session_id=${sessionId}`;
        const response = await fetch(url);
        const result = await response.json();

        prices = result;
    }

    // 페이지 로드 시 세션 확인 실행
    checkSessions();
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
