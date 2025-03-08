<script lang="ts">
    let tickers: any;

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
        const url = "https://y0rfa1se.duckdns.org/api/database/stock/tickers?session_id=" + sessionId;
        const response = await fetch(url);
        const result = await response.json();

        tickers = result;
    }

    // 페이지 로드 시 세션 확인 실행
    checkSessions();
</script>

<h1>tickers</h1>

<ul>
    {#each tickers as ticker}
        <li><a href="{ ticker.TABLE_NAME }">{ ticker.TABLE_NAME }({ ticker.TABLE_ROWS } datas)</a></li>
    {/each}
</ul>
