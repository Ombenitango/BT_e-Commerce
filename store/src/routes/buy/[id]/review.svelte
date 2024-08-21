<script>
  import {onMount} from "svelte"
  import {fly,fade} from "svelte/transition"
  
  import Avatar from "$lib/avatar.svelte"
  import Ratings from "$lib/ratings.svelte"

  export let reviewData
</script>

<div class="w-full p-2"  in:fly="{{x:100,duration:200}}" out:fade>
      <span class="flex items-center mb-2">
        <Avatar config={reviewData.user.photoURL?{url:reviewData.user.photoURL}:{username:reviewData.displayName||"login"}}/>
        <p class="ml-2 !my-0">{reviewData.user.username}</p>
      </span>
      <Ratings rate={reviewData.rating}/>
      <p class="!mt-2 !mb-0">{reviewData.content}</p>
      <div class="flex flex-start">
        <button class="icon">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
        </button>
        <button class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M480 756q15 0 25.5-10.5T516 720q0-15-10.5-25.5T480 684q-15 0-25.5 10.5T444 720q0 15 10.5 25.5T480 756Zm-36-132h72V384h-72v240ZM341 912 144 714V437l197-197h278l197 197v278L618 912H341Zm30-72h218l155-155V467L588 312H371L216 467v218l155 155Zm109-264Z"/></svg>
        </button>
      </div>
    </div>


