<script lang="ts">
    import { goto } from '$app/navigation';

    let tickers: any;

    // API URL 리스트
    const urls: string[] = [
        "https://y0rfa1se.duckdns.org/api/database/session/check",
    ];

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
        if (!sessionId) {
            console.error("Session ID not found.");
            goto("/"); // 세션 ID가 없을 경우 리다이렉트
            return;
        }

        for (const _url of urls) {
            try {
                const response = await fetch(`${_url}?session_id=${sessionId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log("API Response:", result);

                if (result.success) {
                    console.log("Session valid");

                    const url = "https://y0rfa1se.duckdns.org/api/database/stock/tickers?session_id=" + sessionId;
                    const response = await fetch(url);
                    const result = await response.json();

                    tickers = result.data.data;

                    console.log(tickers);
                } else {
                    console.error("Session invalid:", result);
                    goto("/"); // 유효하지 않은 세션일 경우 리다이렉트
                }
            } catch (error) {
                console.error("Error during API request:", error);
                goto("/"); // 에러 발생 시 리다이렉트
            }
        }
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
