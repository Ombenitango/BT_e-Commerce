<script>
    import Ratings from "$lib/ratings.svelte";
    import anime from "../../js/anime.es"
    import{filters} from "../../js/store"

    let collapse,resizeSearch,resizeDrawer
    let {sorts,reviews,categories,reviewSelection,categorySelection,sortSelection,updateFilters}=$filters
    $:{
        reviewSelection=$filters.reviewSelection
        categorySelection=$filters.categorySelection
        sortSelection=$filters.sortSelection
    }
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


        <div class={`${$$props.class} h-full m-3 py-5 shadow-lg border-solid border-[1px] dark:border-none dark:bg-neutral-800 rounded-lg prose lg:prose-xl max-w-none child:text-neutral-700 child:dark:text-white`} id="filters">
            <h3 class="font-semibold !my-1 px-5">Filter</h3>
            <div class="max-h-full px-5 ">
                <h6 class="text-xl w-fit">Category</h6>
                <div class="flex overflow-x-scroll scroll-smooth max-w-full px-1 py-2">
                    {#each categories as category}
                        {#if category==categorySelection}
                            <p class="mx-2 text-xs px-7 w-fit py-2 rounded-full shadow dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:border-solid border-none border-[1px] border-neutral-400 bg-neutral-700 hover:bg-neutral-600 dark:text-neutral-700  text-whiteelected"
                            on:keydown={()=>{}}
                            on:click={()=>{
                                updateFilters("categorySelection",category)
                            }}>{category}</p>
                        {:else}
                            <p class="chip"
                            on:keydown={()=>{}}
                            on:click={()=>{
                               updateFilters("categorySelection",category)
                            }}>{category}</p>
                        {/if}
                    {/each}
                </div>
                <div class="flex my-2 justify-between items-center">
                    <h6 class="text-xl w-fit">Sort by:</h6>
                    
                </div>
                <div class="flex flex-col">
                    {#each sorts as sort}
                        {#if sort==sortSelection}
                            <p class="!my-1 pl-3 leading-normal text-base py-2 bg-neutral-100 shadow dark:bg-neutral-700 rounded">{sort}</p>
                        {:else}
                            <p class="!my-1 pl-3 leading-normal text-base py-2 hover:bg-neutral-100 hover:shadow dark:hover:bg-neutral-700 rounded" 
                            on:keydown={()=>{}}
                            on:click={()=>{
                                updateFilters('sortSelection',sort)
                            }}>{sort}</p>
                        {/if}
                    {/each}
                </div>
                <div class="flex my-2 justify-between items-center">
                    <h6 class="text-xl w-fit">Customer review</h6>
                    
                </div>
                <div class="flex flex-col">
                    {#each reviews as review}
                        {#if review==reviewSelection}
                            <div class="hover:bg-neutral-100 hover:shadow dark:hover:bg-neutral-700 rounded px-2 flex justify-between" on:keydown={()=>{}} on:click={()=>{
                                 }}>
                                <span class="flex">
                                    <Ratings rate={review} badge={true}/>
                                    <p class="!my-1 ml-4">& up</p>
                                </span>
                                <input type="radio" checked="checked">
                            </div>
                        {:else}
                            <div class="hover:bg-neutral-100 hover:shadow dark:hover:bg-neutral-700 rounded px-2 flex justify-between" on:keydown={()=>{}} on:click={()=>{
                                updateFilters("reviewSelection",review)
                             }}>
                                <span class="flex">
                                    <Ratings rate={review} badge={true}/>
                                    <p class="!my-1 ml-4">& up</p>
                                </span>
                                <input type="radio">
                            </div>
                        {/if}
                    {/each}
                </div>
        </div>
        </div>
<style>
    ::-webkit-scrollbar{
        width: 5px;
    }
    #filters::-webkit-scrollbar{
        margin: 30px 0;
    }
   
</style>

