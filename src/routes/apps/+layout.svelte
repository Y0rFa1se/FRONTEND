<script lang="ts">
import { page } from "$app/state";
    import { goto } from "$app/navigation";

    const ticker = page.data.data;
    console.log(ticker);

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

<slot />