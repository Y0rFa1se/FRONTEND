<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const base_url = import.meta.env.VITE_BASE_URL;

    onMount(async () => {
        console.log("onMount");

        const urls: string[] = [
            base_url + "/database/session/check",
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

        const username = new URLSearchParams(window.location.search).get("username");
        const redirectTo = new URLSearchParams(window.location.search).get("redirectTo") || "/";

        if (username === "guest") {
            console.log("guest");

            try {
                const response = await fetch(base_url + "/database/session/login?username=guest&password=password");
                const result = await response.json();
                
                if (result.success && result.session_id) {
                    document.cookie = `session_id=${result.session_id}; path=/; max-age=${60 * 60};`;

                    console.log("success");
                    console.log(redirectTo);
                    goto(redirectTo);
                }
            } catch (error) {
                console.error(error);
            }
        }
    });

    const login = async (event: any) => {
        const urls: string[] = [
            base_url + "/database/session/login",
        ];

        event.preventDefault();
        const formData = new FormData(event.target);

        const username = new URLSearchParams(window.location.search).get("username");
        const password = formData.get("password");
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
