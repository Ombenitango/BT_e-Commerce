import { error } from "@sveltejs/kit";
import { client } from '$js/store.server.js';


export async function DELETE({ params }) {
    const { id } = params;
    try {
        await client.delete(id);
        return new Response(null, { status: 204 });
    } catch (err) {
        console.error("Error deleting order:", err);
        throw error(500, "Error deleting order");
    }
}

// Handle PATCH request
export async function PATCH({ params, request }) {
    const { id } = params;
    const { status } = await request.json();

    try {
        const updatedOrder = await client
            .patch(id)
            .set({ status })
            .commit();

        return new Response(JSON.stringify(updatedOrder), { status: 200 });
    } catch (err) {
        console.error("Error updating order status:", err);
        throw error(500, "Error updating order status");
    }
}
