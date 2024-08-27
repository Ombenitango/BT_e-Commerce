import { error } from "@sveltejs/kit";
import { client } from '$js/store.server.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        // Adjust the query according to your Sanity schema
        const query = `
            *[_type == "orders"]{
                total,
                products[]->{
                title,
                price,
                category,
                mainImage,
                },
                status,
                name,
                phone,
                _createdAt,
                _id
                
            }[0..20] | order(orderTime desc)
        `;

        const orders = await client.fetch(query);
        return {
            orders: orders || []
        };
    } catch (err) {
        console.error("Error fetching orders:", err);
        throw error(500, "Error fetching orders");
    }
}