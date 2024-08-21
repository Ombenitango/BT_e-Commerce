<script>
    import {onMount} from "svelte"
    import { page } from '$app/stores';

    onMount(()=>{
        document.body.setAttribute("id","scrollock")
    })
</script>

<svelte:body id="scrolllock"/>

<article class="grid place-content-center h-40">
    <div class="prose lg:prose-xl mx-2 card child:!text-neutral-700 dark:child:!text-white max-w-none">
        <h1 class="p-5 font-mono">{$page.status}: {$page.error.message}</h1>
    </div>
</article> 