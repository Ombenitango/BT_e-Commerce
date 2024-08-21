<script>
    import {onMount} from "svelte"
    import Ratings from "./ratings.svelte";
    import {cartItems,updateSnacks} from "../js/store"


    export let data

    onMount(()=>{
        console.log({$cartItems});
        console.log(data);
    })
</script>
<!-- 
<section class="prose lg:prose-xl flex flex-col items-center dark:child:text-white child:!my-2">
    <h1>Product card</h1> -->
    <div class="flex flex-col no-underline max-w-sm w-62 sm:w-72 md:w-80 p-5 mx-1 lg:last:!mx-2 card my-2 ">
        <a href={`/buy/${data._id}`} class="text-neutral-700 dark:text-white no-underline">
            <div class="flex justify-center h-48">
                <img src={data.mainImage.asset.url} alt="apple watch" class="max-w-[90%] !my-0">
            </div>
            <p class="font-semibold text-xl max-h-[5ch] min-h-[5ch] overflow-hidden text-ellipsis !mt-6 !mb-0">
                {data.title}
            </p>
            <div class="flex my-3">
                <Ratings rate={data.ratings.rate}/>
            </div>
        </a>
        <div class="flex justify-between items-center ">
            <h1 class="!my-0 font-semibold dark:text-white text-neutral-700 !text-xl">{new Intl.NumberFormat('sw-IN', { style: 'currency', currency: 'TZS' }).format(data.price)}</h1>
            <button class="button !m-0" on:click={()=>{
                if ($cartItems.indexOf(data)==-1){

                    $cartItems=[...$cartItems,data]
                    // console.log($cartItems);
                    updateSnacks(null,"add","added")
                }   
            }}>
                Add to Cart
            </button>
        </div>
    </div>
<!-- </section> -->
