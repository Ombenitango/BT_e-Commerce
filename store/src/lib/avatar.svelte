<script>
    export let config
    // console.log(config);
    if(!config.width){config.width=10}

</script>
{#if config.url}
    <div class="flex flex-col items-center justify-center w-10 h-10 mx-2 shadow rounded-full border-2 border-neutral-200 dark:border-neutral-700 bg-cover" style="background-image: url({config.url});">
    </div>
{:else if config.username}
    <div class="flex flex-col items-center justify-center w-10 h-10 mx-2 shadow rounded-full bg-neutral-200 dark:bg-neutral-700">
        <span class="font-medium text-primary-900 dark:text-neutral-300 uppercase">{config.username.toString()[0]}</span>
    </div>
{:else if config.username="login"}
    <div class="flex flex-col items-center justify-center w-10 h-10 mx-2 shadow rounded-full bg-neutral-200 dark:bg-neutral-700">
        <svg class="w-10 h-10 rounded-full dark:fill-neutral-400 fill-neutral-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
    </div>
    
{/if}
