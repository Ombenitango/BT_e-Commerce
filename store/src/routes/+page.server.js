import { client } from '$js/store.server'
// import imageUrlBuilder from '@sanity/image-url'

// const builder=imageUrlBuilder(client)

export async function load(){
  // let {id}=params
  let query=`{'popular':*[ratings.rate > 4]{title,price,category,ratings,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate desc),'Phones':*[category=="Phones"]{title,price,ratings,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate desc),'ComputersAndLaptops':*[category=="Laptops"||category=="Computers"]{title,price,ratings,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate desc),'Headsets':*[category=="Headsets"]{title,price,ratings,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate desc),'PeripheralsAndNetworking':*[category=="Peripherals"||category=="Networking"]{title,price,ratings,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate desc)} `
  const content = await client.fetch(query)
  // console.log(content[0]);
  // content.map((el,index)=>{
  //   const imageUrl = builder.image(content[index]['mainImage']['asset']['_ref']).url()
  //   content[index]['mainImage']['asset']['_ref'] = imageUrl
  //   for (let item of content[index]["gallery"]){
  //     let galleryIndex=content[index]["gallery"].indexOf(item)
  //     let galleryUrl= builder.image(item['asset']['_ref']).url()
  //     content[index]["gallery"][galleryIndex]=galleryUrl
  //   }
  // })
  if(content){
    return {content}
  }
  throw error(404,"Not found")
}
