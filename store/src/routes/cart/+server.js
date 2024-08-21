import {client} from "$js/store.server"
/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
    try{
        const data = await request.json();
        client.create({
            _type:"orders",
            ...data,
            status:"pending"
        })
        return new Response({status: 200, message:"Order created"})

    }
    catch(error){
        return error({status: 500, body: error.message});
    }
}