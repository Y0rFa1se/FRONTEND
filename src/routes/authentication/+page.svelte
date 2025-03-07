<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    onMount(async () => {
        console.log("onMount");

        const urls: string[] = [
            "https://y0rfa1se.duckdns.org/api/database/session/check",
        ];

        const cookies = document.cookie;
        console.log(cookies);
        const sessionCookie = cookies
            .split(";")
            .find((cookie) => cookie.trim().startsWith("session_id="));
        const sessionId = sessionCookie?.split("=")[1];

        console.log(sessionId);

        if (sessionId) {
            for (const _url of urls) {
                try {
                    const response = await fetch(_url + "?session_id=" + sessionId);
                    const result = await response.json();

                    if (result.success) {
                        const redirectTo =
                            new URLSearchParams(window.location.search).get("redirectTo") || "/";
                        console.log("success");
                        console.log(redirectTo);
                        goto(redirectTo);
                        break;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });

    const login = async (event: any) => {
        const urls: string[] = [
            "https://y0rfa1se.duckdns.org/api/database/session/login",
        ];

        event.preventDefault();
        const formData = new FormData(event.target);

        const password = formData.get("password");
        const username = new URLSearchParams(window.location.search).get("username");
        const redirectTo = new URLSearchParams(window.location.search).get("redirectTo") || "/";

        for (const _url of urls) {
            try {
                const response = await fetch(`${_url}?username=${username}&password=${password}`);
                const result = await response.json();

                if (result.success && result.session_id) {
                    document.cookie = `session_id=${result.session_id}; path=/; max-age=${60 * 60};`;

                    console.log("success");
                    console.log(redirectTo);
                    goto(redirectTo);
                    break;
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
</script>

<form on:submit="{login}" method="post">
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
</form>
