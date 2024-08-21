<script>
  import {onMount} from "svelte"

  export let rate,badge
  let stars=[]
  const generateStars=(rate)=>{
      if (rate.toString().slice(-2)==".5"){
          let int=rate-.5
          for (let i=1;i<5;i++){
            if (i<=int){
              stars=[...stars,"star"]
              if(i==int){
                stars=[...stars,"half-star"]
              }
            }
            else{
              stars=[...stars,'empty-star']
            }
          }
      }
      else{
          rate=Math.round(rate)
          for (let i=1;i<6;i++){
            if (i<=rate){
              stars=[...stars,"star"]
            }
            else{
              stars=[...stars,'empty-star']
            }
          }
        }
      // console.log(stars);
  }

  onMount(()=>{
    generateStars(rate)
  })
</script>


  <div class={`${$$props.class} flex items-center`}>
    {#each stars as star}
      {#if star=="star"}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-yellow-400" height="20" viewBox="0 96 960 960" width="20"><path d="m243 960 90-291L96 480h291l93-288 93 288h291L627 669l90 291-237-180-237 180Z"/></svg>
      {:else if star=="half-star"}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-yellow-400" height="20" viewBox="0 96 960 960" width="20"><path d="M480 426v263l102 78-38-124 114-91H521l-41-126ZM243 960l90-291L96 480h291l93-288 93 288h291L627 669l90 291-237-180-237 180Z"/></svg>
      {:else}
        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      {/if}
    {/each}
    {#if !badge}
      <span class="flex w-fit py-0 px-3 my-1 ml-2 rounded items-center bg-primary-800 fill-primary-300 font-bold badge">
          <p class="!m-0 !p-0 text-white text-base">{rate}</p>
      </span>
    {/if}
  </div>
