import { createClient } from "@sanity/client";
import { SANITY_WRITE_TOKEN, SANITY_PROJECT_ID } from "$env/static/private";

export const client = createClient({
	projectId: SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2023-05-03",
	useCdn: true,
	token: SANITY_WRITE_TOKEN,
});