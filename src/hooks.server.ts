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

        if (result.success) {
            console.log("Session is valid");

            const response = await resolve(event);

            return response;
        } else {
            return Response.redirect(`${event.url.protocol}//${event.url.host}/`, 303);
        }
    }

    return await resolve(event);
};
