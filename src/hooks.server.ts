import { base } from "$service-worker";
import type { Handle } from "@sveltejs/kit";

const base_url = import.meta.env.VITE_BASE_URL;

export const handle: Handle = async ({ event, resolve }) => {
    console.log(event.url.pathname);

    if (event.url.pathname.startsWith("/apps")) {
        console.log("Checking session");

        const session = event.cookies.get("session_id") || "";

        const url: string = base_url + "/database/session/check?session_id=" + session;

        const response = await fetch(url);
        const result = await response.json();

        const url2 = base_url + "/database/session/permission?session_id=" + session;

        const response2 = await fetch(url2);
        const result2 = await response2.json();

        const url3 = base_url + "/database/web/permission?path=" + event.url.pathname;

        const response3 = await fetch(url3);
        const result3 = await response3.json();

        if (result.success && (result3.permission === undefined || result2.permission >= result3.permission)) {
            console.log("Session is valid");

            const response = await resolve(event);

            return response;
        } else if (result2.permission === 0 && (result3.permission === undefined || result3.permission === 0)) {
            console.log("guest");

            const response4 = await fetch(base_url + "/database/session/login?username=guest&password=password");
            const result4 = await response4.json();

            if (result4.success && result4.session_id) {
                document.cookie = `session_id=${result4.session_id}; path=/; max-age=${60 * 60}`;

                return await resolve(event);
            } else {
                console.log("Failed to login as guest");
            }
        } else {
            return Response.redirect(`${event.url.protocol}//${event.url.host}?redirectTo=${event.url.pathname}`, 303);
        }
    }

    return await resolve(event);
};