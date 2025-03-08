import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
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
                    return { "session_id": sessionId };
                } else {
                    throw redirect(303, "/");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
};
