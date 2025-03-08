<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let logout: any;

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

        logout = async () => {
            const url = base_url + "/database/session/logout?session_id=" + sessionId;
            const response = await fetch(url);

            if (response.ok) {
                console.log("Logout successful");
                document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                goto("/");
            } else {
                console.error("Logout failed");
            }
        }
    });
</script>

<button onclick={logout}>Logout</button>

<slot />