<script>
  import Snack from "./snack.svelte";
  import { snacks } from "../js/store";
//   import { onMount } from "svelte";

</script>

{#if $snacks.length>0}
    <section class="w-fit flex flex-col justify-center items-center fixed bottom-0 right-0 left-0 lg:left-auto mx-auto p-10">
        {#each $snacks as snack}
            <Snack data={snack} />
        {/each}
    </section>
{/if}

<!-- - [ ]  Added to cart Snackbar

   Use svelte actions to set a timeot to 
   remove an item from a store

    | Icon - content - close|

     Fly in/out a bit & fade in/out 
    3 states
        addded to cart - priamry tick
        removed from cart - red dumpster
        payment successfull
        payment failed
        cart item 'Remove' -> 'Dumpster icon'
-->
