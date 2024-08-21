import imageUrlBuilder from '@sanity/image-url'

import {client} from "$js/store.server"

const builder=imageUrlBuilder(client)

export async function load({params}){
  let {id}=params
  const content = await client.fetch(`*[_id== '${id}'] `)
  // console.log(content[0]);
  const imageUrl = builder.image(content[0]['mainImage']['asset']['_ref']).url()
  content[0]['mainImage']['asset'].url = imageUrl
  for (let item of content[0]["gallery"]){
    let index=content[0]["gallery"].indexOf(item)
    let galleryUrl= builder.image(item['asset']['_ref']).url()
    content[0]["gallery"][index]=galleryUrl
  }
  if(content){
    return content[0]
  }
  throw error(404,"Not found")
}
