// Products
export default{
    name:"products",
    type:"document",
    title:"Products",
    fields:[
        {
            name:"title",
            type:"string",
            title:"Title",
            validation: Rule=>Rule.required()
        },
        {
            name:"price",
            type:"number",
            title:"Price",
            validation: Rule=>Rule.required()
        },
        {
            name:"mainImage",
            type:"image",
            title:"Thumbnail",
            description:"Main product image",
            validation: Rule=>Rule.required(),
            options:{
                hotspot:true
            }
        },
        {
            name:"gallery",
            type:"array",
            title:"Gallery",
            validation: Rule=>Rule.required(),
            of:[
                {
                    name: "image1",
                    type: "image",
                    title: "First Image",
                    description: "The first image in the gallery",
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: "image2",
                    type: "image",
                    title: "Second Image",
                    description: "The second image in the gallery",
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: "image3",
                    type: "image",
                    title: "Third Image",
                    description: "The third image in the gallery",
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: "image4",
                    type: "image",
                    title: "Forth Image",
                    description: "The forth image in the gallery",
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: "image5",
                    type: "image",
                    title: "Fifth Image",
                    description: "The fifth image in the gallery",
                    options: {
                        hotspot: true,
                    },
                },
            ]
        },
        {
            name:"details",
            type:"text",
            title:"Details",
            validation: Rule=>Rule.required()
        },
        {
            name:"category",
            type:"string",
            title:"Category",
            validation: Rule=>Rule.required(),
            options:[
                {title:"Laptops",value:"Laptops"},
                {title:"Phones",value:"Phones"},
                {title:"Headsets",value:"Headsets"},
                {title:"Computers",value:"Computers"},
                {title:"Peripherals",value:"Peripherals"},
                {title:"Networking",value:"Networking"},
            ]
        },
        {
            name:"weight",
            title:"Weight",
            type:"string",
            validation: Rule=>Rule.required()
        },
        {
            name:"dimensions",
            type:"string",
            title:"Dimensions",
            validation: Rule=>Rule.required()
        },
        {
            name:"colors",
            type:"array",
            validation: Rule=>Rule.required(),
            of:[{type:"color"}]
        },
        {
            name:"ratings",
            type:"object",
            title:"Ratings",
            fields:[
                {name:"rate",type:"number",title:"Rate",validation: Rule=>Rule.required(),},
                {name:"count",type:"number",title:"Count",validation: Rule=>Rule.required(),}
            ]
        }
    ]
}