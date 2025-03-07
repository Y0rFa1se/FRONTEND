<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const urls: string[] = [
        "https://192.168.0.18:8003/database/session/check",
        "https://192.168.0.18:8004/database/session/check",
        "https://localhost:8003/database/session/check",
        "https://localhost:8004/database/session/check",
    ];

    onMount(async () => {
        console.log("onMount");

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
