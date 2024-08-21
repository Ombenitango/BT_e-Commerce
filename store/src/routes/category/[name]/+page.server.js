import {error } from "@sveltejs/kit"
import { client } from '$js/store.server'

/** @type {import('./$types').Foo} */
export async function load({params}) {
    let category=params.name
    let query=`*[_type=="products" && category=="${category}"]{title,price,ratings,category,mainImage{asset->{url}},_id}[0..20]|order(_createdAt desc)`
    const items=client.fetch(query)
    return{
        items
    }
}