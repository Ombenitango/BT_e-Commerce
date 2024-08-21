<script>
    export let data
    import {cartItems} from "../js/store"
    let added=false
</script>

{#if data}
<a  href={`/buy/${data._id}`} class="no-underline flex flex-col justify-between shadow-md dark:hover:bg-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 rounded-xl h-64 md:h-80 w-60 md:w-72 min-w-[200px] md:min-w-[280px] px-5 py-3 pt-7 mx-5 lg:mx-5 relative">
    <!-- <div class="flex flex-col justify-between  dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow h-60 w-40 min-w-[180px] md:w-auto md:max-w-sm px-2 pt-5 pb-2 xl:px-5 xl:pb-5 xl:pt-8 mx-5 lg:mx-5 relative"> -->
        <img src={data['mainImage']['asset']['url']} class="!my-0 h-28 md:h-36" alt="product pic">
        <p class="max-h-[3em] leading-normal !my-1 font-semibold overflow-hidden text-ellipsis text-xl text-neutral-700 dark:text-white">{data.title}</p>
        <div class="flex justify-between">
            <p class="!my-0 text-base"><strong class="text-neutral-800 dark:text-gray-300">{new Intl.NumberFormat('sw-IN', { style: 'currency', currency: 'TZS' }).format(data.price)}</strong></p>
            <span class="flex w-fit px-2 py-1 my-1 ml-2 rounded items-center bg-primary-800 fill-primary-300 font-bold">
                <p class="!m-0 !p-0 text-white text-xs">{data.ratings.rate}</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-yellow-400 ml-1" height="20" viewBox="0 96 960 960" width="20"><path d="m243 960 90-291L96 480h291l93-288 93 288h291L627 669l90 291-237-180-237 180Z"/></svg>
            </span>
        </div>
        <!-- <div on:click={()=>{
            if(added){
                let temp=$cartItems
                let index=temp.indexOf(data)
                temp.splice(index,index+1)
                $cartItems=temp
            }
            else{
                $cartItems=[...$cartItems,data]
            }
            added=!added
        }} class="p-1 rounded-full bg-primary svg:fill-white absolute top-0 left-0 m-2">
            {#if added}
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
            {/if}
        </div> -->
</a>
    
{:else}
<div class="flex flex-col justify-between shadow-md dark:hover:bg-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 rounded-xl h-64 w-60 min-w-[200px] md:w-auto md:max-w-sm px-5 py-3 pt-7 mx-5 lg:mx-5 relative">
    <!-- <div class="flex flex-col justify-between  dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow h-60 w-40 min-w-[180px] md:w-auto md:max-w-sm px-2 pt-5 pb-2 xl:px-5 xl:pb-5 xl:pt-8 mx-5 lg:mx-5 relative"> -->
        <img src="/apple-watch.png" class="!my-0" alt="product pic">
        <p class="max-h-[3em] leading-normal !my-1 font-semibold overflow-hidden text-ellipsis text-xl">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</p>
        <p class="!my-0"><strong class="text-neutral-800 dark:text-gray-300">$599</strong></p>
        <div class="p-1 rounded-full bg-primary bg-opacity-50 hover:bg-opacity-100 hover:svg:fill-white svg:fill-primary absolute top-0 left-0 m-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
        </div>
    </div>
    
{/if}

