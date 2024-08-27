// src/routes/admin/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.user) {
        // throw redirect(303, '/auth');
        return { user: locals.user };
    }
    console.log(!locals.user)
    // Proceed with page data loading
    return { user: locals.user };
};
