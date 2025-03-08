<script lang="ts">
    import { goto } from '$app/navigation';

    const urls: string[] = [
        "https://y0rfa1se.duckdns.org/api/database/session/check",
    ];

    const cookies = document.cookie;
    console.log(cookies);
    const sessionCookie = cookies
        .split(";")
        .find((cookie) => cookie.trim().startsWith("session_id="));
    const sessionId = sessionCookie?.split("=")[1];

    console.log("apps / " + sessionId);

    for (const _url of urls) {
        try {
            const response = fetch(_url + "?session_id=" + sessionId);
            const result = response.json();

            if (result.success) {
                console.log("apps / " + result);
            } else {
                console.log(result);

                goto("/");
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>

<h1>Apps</h1>

<a href="stock_database">stock database</a>

