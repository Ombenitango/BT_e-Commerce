<script>
    import {onMount} from "svelte"
    import {goto} from "$app/navigation"
    import {filters} from "../js/store"
  
    import HomeProduct from '$lib/homeProduct.svelte';
    import anime from "../js/anime.es"
    import Ratings from "$lib/ratings.svelte";
  
    let searchQuery=""
    export let data
    data=data.content
    // console.log(data);
    let {sorts,reviews,categories,reviewSelection,categorySelection,sortSelection,updateFilters}=$filters
    $:{
        reviewSelection=$filters.reviewSelection
        categorySelection=$filters.categorySelection
        sortSelection=$filters.sortSelection
    }
    // console.log(sorts,reviews,categories,reviewSelection,categorySelection,sortSelection);
    
    let sortCollapse,sortCaret,reviewsCaret,reviewsCollapse,resize,filtersCollapse,resizeFilters
  
    onMount(()=>{
        // console.log(dummyProducts);
      resize=(target,caret)=>{
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
      resizeFilters=()=>{
              if(filtersCollapse.style.display!="flex"){
                  filtersCollapse.style.display="flex"
                  anime({
                      targets:filtersCollapse,
                      translateX:"0%",
                      duration:200,
                      easing:"linear",
                  })                
              }
              else{
                  filtersCollapse.style.display="none"
                  anime({
                      targets:filtersCollapse,
                      translateX:"-110%",
                      easing:"linear",
                      duration:200
                  }) 
              }
          }
    })
  </script>
  
  <article class="prose md:prose-xl xl:prose-2xl flex flex-col justify-center items-center h-full w-full max-w-none mt-5">
      <section class="flex flex-col child:dark:!text-white child:!text-neutral-700 w-full p-5 lg:p-10 prose-headings:font-mono">
          <h1  class="!my-1">Discover</h1>
          <h3 class="!text-gray-600 !my-1 font-normal">New collections</h3>
          <div class="flex py-3">
              <span class="flex-[8] flex rounded-lg px-2 py-3 dark:bg-neutral-800 bg-neutral-200 dark:text-neutral-300 text-neutral-700 svg:fill-neutral-300 max-w-xs">
                  <svg on:keydown={()=>{}} on:click={()=>{
                      goto(`/search?q=${searchQuery}&sort=${sortSelection=="Price:Low to High"? 'asc':'desc'}`)
                  }} xmlns="http://www.w3.org/2000/svg" class="hover:fill-neutral-500" height="24" width="24"><path d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"/></svg>
                  <input on:keydown={(e)=>{
                      if(e.key=="Enter"){
                          goto(`/search?q=${searchQuery}&sort=${sortSelection=="Price:Low to High"? 'asc':'desc'}`)
                      }
                  }} bind:value={searchQuery} type="text" placeholder="Find your product" class="w-auto bg-inherit text-xs outline-none text-center">
              </span>
              <div on:click={()=>resizeFilters()} class=" bg-primary p-3 rounded-lg ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="fill-white"><path d="M11 21v-6h2v2h8v2h-8v2Zm-8-2v-2h6v2Zm4-4v-2H3v-2h4V9h2v6Zm4-2v-2h10v2Zm4-4V3h2v2h4v2h-4v2ZM3 7V5h10v2Z"/></svg>
              </div>
          </div>
          <section bind:this={filtersCollapse} class="hidden translate-x-[-110%] bg-neutral-50 dark:bg-neutral-800 shadow-md  rounded-lg flex-col w-full max-w-md p-5">
              <div>
                  <h6 class="text-xl w-fit">Category</h6>
                  <div class="flex md:overflow-x-scroll overflow-hidden scroll-smooth max-w-full px-1 py-2">
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
                      <div class="hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:svg:fill-white rounded-full w-fit h-fit p-1" on:click={()=>resize(sortCollapse,sortCaret)} bind:this={sortCaret}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m376 816-56-56 184-184-184-184 56-56 240 240-240 240Z"/></svg>
                      </div>
                  </div>
                  <div class="hidden flex-col" bind:this={sortCollapse}>
                      {#each sorts as sort}
                          {#if sort==sortSelection}
                              <p class="!my-1 pl-3 leading-normal text-base py-2 bg-neutral-100 shadow dark:bg-neutral-700 rounded" 
                              on:keydown={()=>{}}
                              on:click={()=>{
                                  updateFilters('sortSelection',sort)
                                }}>{sort}</p>
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
                      <div class="hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:svg:fill-white rounded-full w-fit h-fit p-1" on:click={()=>resize(reviewsCollapse,reviewsCaret)} bind:this={reviewsCaret}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m376 816-56-56 184-184-184-184 56-56 240 240-240 240Z"/></svg>
                      </div>
                  </div>
                  <div class="hidden flex-col" bind:this={reviewsCollapse}>
                      {#each reviews as review}
                          {#if review==reviewSelection}
                              <div class="hover:bg-neutral-100 hover:shadow dark:hover:bg-neutral-700 rounded px-2 flex justify-between" on:keydown={()=>{}} on:click={()=>{
                                      resize(reviewsCollapse,reviewsCaret)
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
  
          </section>
      </section>
      <section class="flex flex-col child:dark:!text-white child:!text-neutral-700 w-full p-5 my-5">
          <h3 class="!mt-1 !mb-10 font-mono lg:p-10 title">Popular products</h3>
          <div class="flex overflow-x-scroll scroll-smooth max-w-full pb-5">
            {#each data.popular as productData}
                <HomeProduct data={productData}/>
            {/each}
              <!-- <HomeProduct/>
              <HomeProduct/>
              <HomeProduct/>
              <HomeProduct/>
              <HomeProduct/>
              <HomeProduct/>
              <HomeProduct/> -->
          </div>
      </section>
      <section class="flex flex-col child:dark:!text-white child:!text-neutral-700 w-full p-5 lg:p-10">
          <h3 class="!my-1 font-mono">Shop by Category</h3>
          <div class="flex text-red-800  w-full overflow-x-scroll scroll-smooth max-w-full child:no-underline">
              <a href="/category/Laptops" class="flex flex-col justify-center min-w-[128px] ld:min-w-[208px] items-center mx-auto dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl shadow dark:text-white text-neutral-700 p-3 my-5">
                  <img class="!my-0 h-20" src="/laptop.svg" alt="laptop">
                  <p class="!my-2 text-base !leading-tight text-center whitespace-nowrap text-ellipsis max-w-[10ch] overflow-hidden">laptops</p>                    
              </a>
              <a href="/category/Phones" class="flex flex-col justify-center w-32 min-w-[128px] items-center mx-auto dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl shadow dark:text-white text-neutral-700 p-3 my-5">
                  <img class="!my-0 h-20" src="/phone.svg" alt="phone">
                  <p class="!my-2 text-base !leading-tight text-center whitespace-nowrap text-ellipsis max-w-[10ch] overflow-hidden">Phones</p>
              </a>
              <a href="/category/Headsets" class="flex flex-col justify-center w-32 min-w-[128px] items-center mx-auto dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl shadow dark:text-white text-neutral-700 p-3 my-5">
                  <img class="!my-0 h-20" src="/headphone.svg" alt="phone">
                  <p class="!my-2 text-base !leading-tight text-center whitespace-nowrap text-ellipsis max-w-[10ch] overflow-hidden">headsets</p>
              </a>
              <a href="/category/Computers" class="flex flex-col justify-center w-32 min-w-[128px] items-center mx-auto dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl shadow dark:text-white text-neutral-700 p-3 my-5">
                  <img class="!my-0 h-20" src="/computers.svg" alt="phone">
                  <p class="!my-2 text-base !leading-tight text-center whitespace-nowrap text-ellipsis max-w-[10ch] overflow-hidden">Computers</p>
              </a>
             
              <a href="/category/Peripherals" class="flex flex-col justify-center w-32 min-w-[128px] items-center mx-auto dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl shadow dark:text-white text-neutral-700 p-3 my-5">
                  <img class="!my-0 h-20" src="/office.svg" alt="phone">
                  <p class="!my-2 text-base !leading-tight text-center whitespace-nowrap text-ellipsis max-w-[10ch] overflow-hidden">peripherals</p>
              </a>
              <a href="/category/Networking" class="flex flex-col justify-center w-32 min-w-[128px] items-center mx-auto dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl shadow dark:text-white text-neutral-700 p-3 my-5">
                  <img class="!my-0 h-20" src="/network.svg" alt="phone">
                  <p class="!my-2 text-base !leading-tight text-center whitespace-nowrap text-ellipsis max-w-[10ch] overflow-hidden">Networking</p>
              </a>
          </div>
      </section>
      <section class="flex flex-col child:dark:!text-white child:!text-neutral-700 w-full p-5 my-5">
          <h3 class="!mt-1 !mb-10 font-mono lg:p-10 title">Smartphone Showcase</h3>
          <div class="flex overflow-x-scroll scroll-smooth max-w-full pb-5">
            {#each data.Phones as productData}
                <HomeProduct data={productData}/>
                {/each}
            </div>
        </section>
        <section class="flex flex-col child:dark:!text-white child:!text-neutral-700 w-full p-5 my-5">
            <h3 class="!mt-1 !mb-10 font-mono lg:p-10 title flex svg:fill-current items-center svg:ml-2 svg:scale-125">Computers And Laptops</h3>
            <div class="flex overflow-x-scroll scroll-smooth max-w-full pb-5">
              {#each data.ComputersAndLaptops as productData}
                  <HomeProduct data={productData}/>
              {/each}
            </div>
        </section>
        <section class="flex flex-col child:dark:!text-white child:!text-neutral-700 w-full p-5 my-5">
            <h3 class="!mt-1 !mb-10 font-mono lg:p-10 title">Peripherals and Networking</h3>
            <div class="flex overflow-x-scroll scroll-smooth max-w-full pb-5">
                {#each data.PeripheralsAndNetworking as productData}
                    <HomeProduct data={productData}/>
                {/each}
          </div>
      </section>
      <section class="flex flex-col child:dark:!text-white child:!text-neutral-700 w-full p-5 my-5">
        <h3 class="!mt-1 !mb-10 font-mono lg:p-10 title">Headsets</h3>
        <div class="flex overflow-x-scroll scroll-smooth max-w-full pb-5">
            {#each data.Headsets as productData}
                <HomeProduct data={productData}/>
            {/each}
      </div>
  </section>
  </article>
  
  <style lang="scss">
      /* .overflow-x-scroll::-webkit-scrollbar{
          height: 10px;
          background-color: #404040;
          padding: 2px;
          border: solid #525252 2px;
      }
      .overflow-x-scroll::-webkit-scrollbar-thumb{
          background-color: #262626;
          border-radius: 1000000px;
      } */
      
      .title{
          position: relative;
          padding: 0 !important;
          width: fit-content;
      }
      .title::before{
          transition: 1000ms;
          content:" ";
          height:5px;
          width: 10px;
          border-radius: 1000px;
          position: absolute;
          top: 100%;
          left: 0;
      }
     .title:hover{
          &::before{
              width: 50%;
          }
      }
  </style>