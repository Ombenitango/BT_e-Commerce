import {error } from "@sveltejs/kit"
import { client } from '$js/store.server'

/** @type {import('./$types').Foo} */
export async function load({url}) {
    let sort = url.searchParams.get("sort")|| null
    let q = url.searchParams.get("q")|| null
    let rate = url.searchParams.get("rate")|| null
    let order
    // "tdsc""pasc""pdsc""rasc"
    switch (sort) {
        case "tdsc":
            order="order(_createdAt desc)"
            break;
        case "pasc":
            order="order(price asc)"
        case "pdsc":
            order="order(price desc)"
        case "rdsc":
            order="order(ratings.rate desc)" 
        default:
            order="order(_createdAt desc)"
            break;
    }
    let category = url.searchParams.get("category")|| null
    let query=`*[_type=="products"${rate?"&&"+"ratings.rate>="+rate:""}&&title match '${q}'||description match '${q}'${category?"&&"+"category=='"+category+"'":""}]{title,price,ratings,category,mainImage{asset->{url}},_id}[0..20]${sort?"|"+order:""}`
    console.log(query);
    const items=client.fetch(query)
    return{
        items
    }
}