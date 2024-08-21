<script>
    import {onMount} from "svelte"
    import {page} from "$app/stores"
    import {beforeNavigate } from "$app/navigation"

    import Product from "$lib/product.svelte"
    import SideFilters from './sideFilters.svelte';
    import SideView from "$lib/sideView.svelte";

    import anime from "../../js/anime.es"

    export let data
    let results=data.items
    
    let sort="Top" 
    let collapse,caret
    let query

    $:{query=$page.url.searchParams.get("q")||null}
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

<!-- <svelte:body id="scrolllock"/> -->

<SideView class="mt-3 ml-3 mr-3">
    <SideFilters class="!shadow-none !w-full !m-0"/>
</SideView>
<article class="flex pb-24 md:pb-10">
    <aside class="rounded-lg bottom-0 top-0 hidden md:block w-72">
        <SideFilters/>
    </aside>
    <section class="flex flex-col pr-5 py-5">
        <div class="px-2 flex items-center justify-between w-full prose lg:prose-xl max-w-none child:text-neutral-700 child:dark:text-white">
            <div class="md:hidden p-2 rounded-lg w-fit h-fit hover:svg:fill-primary hover:bg-neutral-200 dark:hover:bg-neutral-800 svg:fill-neutral-700 dark:svg:fill-white"
                on:keydown={()=>{}}
                on:click={()=>{
                    let parentElement=document.getElementById("side")
                    if(parentElement.style.transform ==" "){
                    parentElement.style.background="none"
                    anime({
                        targets:"#side",
                        translateX:"-100%",
                        easing:"easeInCubic",
                        duration:250
                    })
                    setTimeout(()=>{collapse.style.display="none"},600)
                }
                else{
                    parentElement.style.display="flex"
                    parentElement.style.background="rgba(0,0,0,.5)"
                    anime({
                        targets:"#side",
                        translateX:"0%",
                        easing:"easeInCubic",
                        duration:250
                    })
                }
                 }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="fill-white s-A-bC3Hke5zSn"><path d="M11 21v-6h2v2h8v2h-8v2Zm-8-2v-2h6v2Zm4-4v-2H3v-2h4V9h2v6Zm4-2v-2h10v2Zm4-4V3h2v2h4v2h-4v2ZM3 7V5h10v2Z" class="s-A-bC3Hke5zSn"></path></svg>
            </div>
            <h3 class="!my-2">Over {results.length} results for  <span class="text-primary">{query?query:"Clothing"}</span></h3>        
            <div class="relative rounded text-xs md:text-base w-20 md:w-32 ml-3">
                <span class="flex font-semibold items-center outline-neutral-800 outline outline-1 dark:outline dark:bg-neutral-800 p-2 w-full rounded overflow-hidden whitespace-nowrap text-ellipsis hover:rounded-b-none" on:keydown={()=>{}} on:click={(e)=>resize(collapse,caret)}>
                    <p class="!my-0 text-center flex-[6]">{sort}</p>
                    <svg class="fill-current" bind:this={caret} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m376 816-56-56 184-184-184-184 56-56 240 240-240 240Z"></path></svg>
                </span>
                <div class="flex-col hidden absolute w-full mr-2 bg-neutral-50 dark:bg-neutral-800" bind:this={collapse}>
                  <span class="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 w-full my-1 rounded" on:click={function(){
                    sort=this.textContent
                    resize(collapse,caret)
                  }}>
                    Top
                  </span>
                  <span class="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 w-full my-1 rounded" on:click={function(){
                    sort=this.textContent
                    resize(collapse,caret)
                  }}>Newest</span>
                </div>
              </div>
        </div>
        <div class="flex flex-wrap gap-2 overflow-y-scroll">
            {#each results as item}
                <Product data={item}/>
            {/each}
        </div>
    </section>
</article>
