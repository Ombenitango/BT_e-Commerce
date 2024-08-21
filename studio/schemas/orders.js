export default{
    name:"orders",
    type:"document",
    title:"Orders",
    fields:[
        {
            name:"name",
            type:"string",
            title:"Name",
            validation:Rule => Rule.required(),
            // readOnly:true,
        },
        {
            name:"userID",
            type:"string",
            title:"User ID",
            validation:Rule => Rule.required(),
            // readOnly:true,
        },
        {
            name:"email",
            type:"string",
            title:"Email",
            validation:Rule => Rule.required(),
            // readOnly:true,
        },
        {
            name:"phone",
            type:"string",
            title:"Phone",
            validation:Rule => Rule.required(),
            // readOnly:true,
        },
        {
            name:"address",
            type:"string",
            title:"Address",
            validation:Rule => Rule.required(),
            // readOnly:true,
        },
        {
            name:"city",
            type:"string",
            title:"City",
            validation:Rule => Rule.required(),
            // readOnly:true,
        },  
        // {
        //     name:"zip",
        //     type:"string",
        //     title:"Zip",
        // },
        // {
        //     name:"country",
        //     type:"string",
        //     title:"Country",
        // },
        {
            name:"products",
            type:"array",
            title:"Products",
            validation:Rule => Rule.required(),
            // readOnly:true,
            of:[
                {
                    type:"reference",
                    to:[
                        {
                            type:"products"
                        }
                    ]
                }
            ]
        },
        {
            name:"total",
            type:"number",
            title:"Total",
            validation:Rule => Rule.required(),
            // readOnly:true,
        },
        {
            name:"status",
            type:"string",
            title:"Status",
            validation:Rule => Rule.required(),
            // readOnly:true,
        }
    ]

}