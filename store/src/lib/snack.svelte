<script>
  // import {snacks} from "../js/store"
  import { onMount } from "svelte";
  import { fly } from "svelte/transition"

  import { Ban } from "lucide-svelte";

  import { snacks ,updateSnacks } from "../js/store";

  export let data;

  onMount(()=>{
    window.setTimeout(()=>{
        (()=>{
            // console.log(data,$snacks);
            updateSnacks(data,"remove")
        })()
    },3000)
  })

//   console.log(data);
</script>

<div in:fly={{x:100, duration:500}} out:fly={{x:-100, duration:500}} class="z-40 flex items-center justify-between rounded-lg bg-neutral-50 shadow dark:bg-neutral-800 py-2 px-3 my-2">
  {#if data.action == "added"}
    <div class="rounded-full bg-neutral-100 dark:bg-neutral-800 p-2 svg:fill-primary-500">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M252.309-100.001q-30.308 0-51.308-21t-21-51.308v-455.382q0-30.308 21-51.308t51.308-21h77.692v-10q0-62.154 43.923-106.077Q417.846-859.999 480-859.999q62.154 0 106.076 43.923 43.923 43.923 43.923 106.077v10h77.692q30.308 0 51.308 21t21 51.308v455.382q0 30.308-21 51.308t-51.308 21H252.309Zm137.69-599.998h180.002v-10q0-37.616-26.193-63.808Q517.616-800 480-800t-63.808 26.193q-26.193 26.192-26.193 63.808v10ZM600-520q12.769 0 21.384-8.615t8.615-21.384V-640h-59.998v90.001q0 12.769 8.615 21.384T600-520Zm-240 0q12.769 0 21.384-8.615t8.615-21.384V-640h-59.998v90.001q0 12.769 8.615 21.384T360-520Z" />
      </svg>
    </div>
    <p class="mx-3 text-neutral-700 dark:text-white">Item added to cart</p>
    <div
        on:keydown={()=>{}}
        on:click={()=>{
           updateSnacks(data,"remove")
        }} 
        class="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 svg:fill-neutral-700 dark:svg:fill-neutral-500">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M291-253.847 253.847-291l189-189-189-189L291-706.153l189 189 189-189L706.153-669l-189 189 189 189L669-253.847l-189-189-189 189Z" /></svg>
    </div>
  {:else if data.action == "removed"}
    <div class="rounded-full bg-neutral-100 dark:bg-neutral-800 p-2 svg:fill-primary-500">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M622.615-457.694h-7.693L282.616-789.999h484.613q24.538 0 37.038 20.461 12.5 20.462-.269 44.616L677.384-494.309q-9.847 18.077-24.269 27.346-14.423 9.269-30.5 9.269Zm-336.461 360q-28.769 0-49.384-20.422-20.615-20.423-20.615-49.577 0-29.153 20.615-49.576 20.615-20.423 49.384-20.423 28.769 0 49.384 20.423 20.616 20.423 20.616 49.576 0 29.154-20.616 49.577-20.615 20.422-49.384 20.422Zm530 38.153L576.77-297.694H300.923q-39.384 0-59.5-33.269-20.115-33.268-2.038-68.883l49.693-95.232-77.385-168.923L58.771-816.923l42.153-42.153 757.382 757.382-42.152 42.153ZM516.771-357.692 416.77-457.694h-80.463l-43.846 84.616q-3.077 5.77-.193 10.578 2.885 4.808 8.655 4.808h215.848ZM673.846-97.694q-28.769 0-49.384-20.422-20.616-20.423-20.616-49.577 0-29.153 20.616-49.576 20.615-20.423 49.384-20.423 28.769 0 49.384 20.423 20.615 20.423 20.615 49.576 0 29.154-20.615 49.577-20.615 20.422-49.384 20.422Z" /></svg>
    </div>
    <p class="mx-3 text-neutral-700 dark:text-white">Item removed from cart</p>
  <div
        on:keydown={()=>{}}
        on:click={()=>{
            updateSnacks(data,"remove")
        }} 
        class="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 svg:fill-neutral-700 dark:svg:fill-neutral-500">      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M291-253.847 253.847-291l189-189-189-189L291-706.153l189 189 189-189L706.153-669l-189 189 189 189L669-253.847l-189-189-189 189Z" /></svg>
    </div>
  {:else if data.action == "failed"}
    <div class="rounded-full bg-neutral-100 dark:bg-neutral-800 p-2 svg:fill-primary-500">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M574-618.385q-12-30-35.5-47t-56.5-17q-18 0-36.539 5.77-18.538 5.769-32.538 20.923l-43.384-43.384q14.385-15.154 37.423-25.884 23.039-10.731 43.039-13.346v-74.769h59.998v73.538q38.846 6.307 71.307 30.346 32.462 24.038 49.462 66.884L574-618.385Zm208.769 525.46L607.231-268.465q-15.77 19.231-43.693 32.001-27.923 12.769-53.539 14v74.769h-59.998v-76.769q-52.923-11.692-86.577-46-33.653-34.307-50.653-87.999L372-382q12.385 42 40.692 72Q441-280 488-280q23.385 0 42.424-8.539 19.039-8.539 33.423-23.308L92.926-782.769l42.153-42.152 689.842 689.842-42.152 42.153Z" /></svg>
    </div>
    <p class="mx-3 text-neutral-700 dark:text-white">Insufficient balance</p>
  <div
        on:keydown={()=>{}}
        on:click={()=>{
            updateSnacks(data,"remove")
        }} 
        class="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 svg:fill-neutral-700 dark:svg:fill-neutral-500">      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M291-253.847 253.847-291l189-189-189-189L291-706.153l189 189 189-189L706.153-669l-189 189 189 189L669-253.847l-189-189-189 189Z" /></svg>
    </div>
  {:else if data.action == "success"}
    <div class="rounded-full bg-neutral-100 dark:bg-neutral-800 p-2 svg:fill-primary-500">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M453.693-223.693h51.614v-45.461q45.538-5.308 79.269-37.962 33.731-32.653 33.731-76.884 0-45-28.269-74.307-28.269-29.308-85.269-50.308-64.078-23.539-81.27-39.808-17.192-16.269-17.192-43.577 0-22.308 20.193-38 20.192-15.693 50.5-15.693 27.231 0 49.385 12.731 22.154 12.731 31.461 34.961l44.384-18.845Q588.691-646.769 563.345-666q-25.346-19.23-58.038-24.846v-45.461h-50.614v46.461q-46.154 8.846-72.577 36-26.423 27.154-26.423 62.846 0 43.077 30.308 73.038 30.307 29.962 99 54.116 45.769 16.384 65.115 34.961 19.346 18.577 19.346 44.885 0 30.616-24.654 49.654-24.654 19.039-56.808 19.039-33.769 0-60.423-21.808-26.654-21.807-37.962-54.884l-46.614 20.615q13.538 38.538 43.154 64.768 29.615 26.231 67.538 36.462v46.461ZM480-116.001q-74.769 0-141.115-28.462-66.346-28.461-116.153-78.269-49.808-49.807-78.269-116.153Q116.001-405.231 116.001-480q0-75.769 28.462-141.615 28.461-65.846 78.269-115.653 49.807-49.808 116.153-78.269Q405.231-843.999 480-843.999q75.769 0 141.615 28.462 65.846 28.461 115.653 78.269 49.808 49.807 78.269 115.653Q843.999-555.769 843.999-480q0 74.769-28.462 141.115-28.461 66.346-78.269 116.153-49.807 49.808-115.653 78.269Q555.769-116.001 480-116.001Z" /></svg>
    </div>
    <p class="mx-3 text-neutral-700 dark:text-white">Payment successfull</p>
  <div
        on:keydown={()=>{}}
        on:click={()=>{
            updateSnacks(data,"remove")
        }} 
        class="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 svg:fill-neutral-700 dark:svg:fill-neutral-500">      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M291-253.847 253.847-291l189-189-189-189L291-706.153l189 189 189-189L706.153-669l-189 189 189 189L669-253.847l-189-189-189 189Z" /></svg>
    </div>
    {:else if data.action == "error"}
    <div class="rounded-full bg-neutral-100 dark:bg-neutral-800 p-2 svg:fill-primary-500">
      <Ban class="w-5 h-5 text-red-600"/>
    </div>
    <p class="mx-3 text-red-600 dark:text-red-500">Operation Failed</p>
  <div
        on:keydown={()=>{}}
        on:click={()=>{
            updateSnacks(data,"remove")
        }} 
        class="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 svg:fill-neutral-700 dark:svg:fill-neutral-500">      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M291-253.847 253.847-291l189-189-189-189L291-706.153l189 189 189-189L706.153-669l-189 189 189 189L669-253.847l-189-189-189 189Z" /></svg>
    </div>
  {/if}
</div>
