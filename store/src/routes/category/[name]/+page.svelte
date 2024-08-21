<script>
    import {onMount} from "svelte"
    import {page} from "$app/stores"

    import Product from "$lib/product.svelte"

    import anime from "../../../js/anime.es"
    import {filters,cartItems,user} from "../../../js/store"

    export let data
    let category=$page.params.name

    let caret,collapse,sort="Top"

    const resize=(target,caret)=>{
            if(target.style.display!="flex"){
                target.style.display="flex"
                if(!caret) return
                anime({
                    targets:caret,
                    rotateZ:"90deg",
                    duration:1000
                })                
            }
            else{
                target.style.display="none"
                if(!caret) return
                anime({
                    targets:caret,
                    rotateZ:"0deg",
                    duration:1000
                }) 
            }
        }
</script>
<article class="prose md:prose-xl xl:prose-2xl flex flex-col justify-center items-center h-full w-full max-w-none mt-5">
    <!-- <h3 class="!my-2 primary text-neutral-700 dark:text-white">{category}</h3> -->
    <section class="flex flex-col pr-5 py-5">
        
        <div class="px-10 flex items-center justify-between w-full prose lg:prose-xl max-w-none child:text-neutral-700 child:dark:text-white">
            
            <h3 class="!my-2"><span class="text-primary">{category}</span></h3>        
            <div class="relative rounded text-xs md:text-base w-20 md:w-32 ml-3">
                <span class="flex font-semibold items-center outline-neutral-800 outline outline-1 dark:outline dark:bg-neutral-800 p-2 w-full rounded overflow-hidden whitespace-nowrap text-ellipsis hover:rounded-b-none" on:keydown={()=>{}} on:click={(e)=>resize(collapse,caret)}>
                    <p class="!my-0 w-full ml-5">{sort}</p>
                    <svg class="fill-current" bind:this={caret} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m376 816-56-56 184-184-184-184 56-56 240 240-240 240Z"></path></svg>
                </span>
                <div class="flex-col hidden top-[110%] rounded absolute w-full mr-2 bg-neutral-50 dark:bg-neutral-800" bind:this={collapse}>
                  <span class="p-2 pl-5 hover:bg-neutral-300 dark:hover:bg-neutral-700 w-full my-1 rounded"
                    on:click={function(){
                      sort=this.textContent
                      resize(collapse,caret)
                    }}>Top</span>
                  <span class="p-2 pl-5 hover:bg-neutral-300 dark:hover:bg-neutral-700 w-full my-1 rounded" 
                    on:click={function(){
                      sort=this.textContent
                      resize(collapse,caret)
                    }}>Newest</span>
                </div>
              </div>
        </div>
        <div class="flex justify-center flex-wrap gap-3 p-5 overflow-y-scroll">
            {#each data.items as item}
                <Product data={item}/>
            {/each}
        </div>
    </section>
</article>