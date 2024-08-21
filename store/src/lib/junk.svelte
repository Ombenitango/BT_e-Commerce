<script>
    import Product from "$lib/product.svelte";
    import {onMount} from "svelte"

    import { data } from "../../js/fake";

    let electronics=[],jewelery=[],mens=[]

    const sort=()=>{
        electronics=data.filter(item=>{
            if(item.category=="electronics"){
                return item
            }
        })
        jewelery=data.filter(item=>{
            if(item.category=="jewelery"){
                return item
            }
        })

    }
    sort()
  
</script>
<article class="prose lg:prose-xl dark:text-white text-neutral-700 w-full max-w-none">
    <section class=" w-full">
        <div class="flex justify-between dark:child:!text-white child:!text-neutral-700 px-5">
            <h1>Electronic</h1>
        </div>
        <div class="flex justify-evenly flex-wrap w-full">
            {#each electronics as electronic}
                <Product data={electronic}/>
            {/each}
        </div>
    </section>

</article>
