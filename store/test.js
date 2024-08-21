const generateStars=(rate)=>{
    let stars=[]
    if (rate.toString().slice(-2)==".5"){
        let int=rate-.5
        for (let i=1;i<5;i++){
          if (i<=int){
            stars=[...stars,"star"]
            if(i==int){
              stars=[...stars,"half-star"]
            }
          }
          else{
            stars=[...stars,'empty-star']
          }
        }
    }
    else{
        rate=Math.round(rate)
        for (let i=1;i<6;i++){
          if (i<=rate){
            stars=[...stars,"star"]
          }
          else{
            stars=[...stars,'empty-star']
          }
        }
      }
    return stars
}
// console.log(generateStars(0))
let categories=["Phones","Laptops","Headsets","Computers","Peripherals","Networking",]
  let query=`{'popular':*[ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),`
  for(let category of categories){
    let index=categories.indexOf(category)
    if(index+1==categories.length){
      query+=`'${category}':*[category=="${category}"&& ratings.rate > 4]}{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc)`
    }
    else{
      query+=`'${category}':*[category=="${category}"&& ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),`

    }
    console.log(query);
  }

  `{'popular':*[ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),'Phones':*[category=="Phones"&& ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),'Laptops':*[category=="Laptops"&& ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),'Headsets':*[category=="Headsets"&& ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),'Computers':*[category=="Computers"&& ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),'Peripherals':*[category=="Peripherals"&& ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc),'Networking':*[category=="Networking"&& ratings.rate > 4]{title,price,mainImage{asset->{url}},_id}[0...10]|order(ratings.rate asc)} `