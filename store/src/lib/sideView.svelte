<script>
    import {onMount} from "svelte"

    import anime from "../js/anime.es"
 

    let collapse,resize

    onMount(()=>{
        resize=async()=>{
            if ( collapse){
                collapse.style.background="none"
                 anime({
                    targets:"#side",
                    translateX:"-120%",
                    easing:"easeInCubic",
                    duration:100
                })
                setTimeout(()=>{collapse.style.display="none"},600)
                
            }
        }
        
    })
</script>

<article id="side" class={`${$$props.class} w-full h-screen bg-black bg-opacity-50 fixed flex !m-0 justify-start z-10`} style="transform: translateX(-120%);" bind:this={collapse}>
    <div class="w-full z-20 fixed bottom-0 top-0 left-0" on:click={()=>{resize();}}></div>
    <section class="flex flex-col p-0 card !rounded-lg max-w-sm w-64 h-full z-30">
        <slot/>
    </section>
</article>