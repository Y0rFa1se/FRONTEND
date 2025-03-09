<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const base_url = import.meta.env.VITE_BASE_URL;
    let redirectTo: any;
    let users: any;

    onMount(async () => {
        redirectTo = new URLSearchParams(window.location.search).get("redirectTo") || "/apps";

        console.log("onMount");

        const urls: string[] = [
            base_url + "/database/session/check",
        ];

        const cookies = document.cookie;
        console.log(cookies);
        const sessionCookie = cookies
            .split(";")
            .find((cookie) => cookie.trim().startsWith("session_id="));

        let sessionId = undefined;

        if (sessionCookie) {
            sessionId = sessionCookie?.split("=")[1];
        }

        console.log(sessionId);

        if (sessionId) {
            for (const _url of urls) {
                try {
                    const response = await fetch(_url + "?session_id=" + sessionId);
                    const result = await response.json();

                    if (result.success) {
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

        let _url = base_url + "/database/web/users";
        const response = await fetch(_url);
        const result = await response.json()

        users = result;
    });
</script>
    
<h1>Login</h1>

{#each users as user}
    <a href="/authentication?username={ user.username }&redirectTo={ redirectTo }">{ user.username }</a>
{/each}

<p><a href="https://github.com/Y0rFa1se">Github</a></p>