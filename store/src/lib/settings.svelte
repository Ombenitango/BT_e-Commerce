<script>
    import { onMount } from "svelte";
    import anime from "../js/anime.es"
    
    import Drop from "./drop.svelte"

    import {colorTheme,user} from "../js/store"
    
    let translate
    let editing=false

    let modal

    let resizeModal=()=>{
        modal=document.querySelector("#modal")
        modal.style.display="flex"
        anime({
            targets:"#dropzone",
            scale:["70%","100%"],
            easing:"linear",
            direction:"fowards",
            duration:100
        })

    }
    onMount(()=>{
        translate=()=>{
            anime({
                targets:'#settings',
                translateX:"100%",
                easing:"easeInCubic",
                duration:500
            })
        }
    })
</script>

<section id="settings" style="transform: translateX(100%);" class="flex flex-col p-2 card !rounded max-w-sm w-64 px-5 h-full fixed z-30 border-0 border-l-2 dark:border-none">
    <div class="flex items-center justify-between  text-xl w-full dark:text-neutral-50 text-neutral-700 ">
        <p class="text-xl font-semibold">Settings</p>
        <div on:click={()=>{
            translate("settings")
        }} class="w-fit h-fi p-2 rounded-full hover:bg-neutral-100 hover:shadow dark:hover:bg-neutral-700 svg:fill-current ">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </div>
    </div>
    <div class="mt-20 mb-3 flex flex-col items-center text-xl w-full dark:text-neutral-400 text-neutral-700 ">
        <div class="relative">
            {#if $user.photoURL}
                <div class="bg-cover flex flex-col items-center justify-center w-24 h-24 shadow rounded-full bg-neutral-200 dark:bg-neutral-700 border-2 border-current border-dashed" style="background-image: url({$user.photoURL});">
                </div>
            {:else}
                <div class="flex flex-col items-center justify-center w-24 h-24 shadow rounded-full bg-neutral-200 dark:bg-neutral-700 border-2 border-current border-dashed">
                    <!-- <span class="font-medium text-xl text-primary-900 dark:text-neutral-300 uppercase">{$user.displayName.toString()[0]}</span> -->
                    <span class="font-medium text-xl text-neutral-700 dark:text-neutral-400 uppercase">{$user.displayName?$user.displayName[0]:1}</span>
                </div>
            {/if}
            <span on:click={()=>{
                resizeModal()
            }} class="top-[70%] left-[70%] p-1 w-fit h-fit absolute text-neutral-300 dark:text-neutral-800 dark:bg-neutral-400 bg-neutral-700 svg:fill-current rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M480.5 796q76.5 0 129-52.5T662 615q0-76-52.5-128.5t-129-52.5Q404 434 352 486.5T300 615q0 76 52 128.5T480.5 796Zm0-84q-41.5 0-69-28.183t-27.5-69Q384 574 411.5 546q27.5-28 69-28t69.5 28.183q28 28.183 28 69T550 684q-28 28-69.5 28ZM164 936q-34.65 0-59.325-24.675Q80 886.65 80 852V379q0-34.65 24.675-59.325Q129.35 295 164 295h122l73-79h241.529L675 295h121q34.65 0 59.325 24.675Q880 344.35 880 379v473q0 34.65-24.675 59.325Q830.65 936 796 936H164Zm632-84V379H639l-74-79H396l-74 79H164v473h632ZM480 615Z"/></svg>
            </span>
        </div>
    </div>
    <div class="flex items-center justify-between">
        <p class="text-base font-semibold">Personal Information</p>
        {#if editing}

            <div on:click={()=>{
                editing=!editing
            }} class="w-fit h-fi p-2 rounded-full hover:bg-neutral-100 hover:shadow hover:dark:bg-neutral-700 svg:fill-primary ">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M204 852h59l336-336-59-59-336 336v59Zm573-394L598 279l49-49q25-25 59.5-25t59.5 25l60 60q24 24 24 59.5T826 409l-49 49Zm-59 59L299 936H120V757l419-419 179 179Zm-148-30-30-30 59 59-29-29Z"/></svg>
            </div>
        {:else}
            <div on:click={()=>{
                editing=!editing
            }} class="w-fit h-fi p-2 rounded-full hover:bg-neutral-100 hover:shadow hover:dark:bg-neutral-700 svg:fill-current ">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M204 852h59l336-336-59-59-336 336v59Zm573-394L598 279l49-49q25-25 59.5-25t59.5 25l60 60q24 24 24 59.5T826 409l-49 49Zm-59 59L299 936H120V757l419-419 179 179Zm-148-30-30-30 59 59-29-29Z"/></svg>
            </div>
        {/if}
    </div>
    <!-- <div class="flex flex-col dark:text-neutral-400 text-neutral-700">
        <p class="text-base font-semibold">Username:</p>
        <span class="px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-300 font-semibold">
            <input class="bg-inherit outline-none max-w-[100%]" type="text" value={"Echnida"} disabled={!editing}>
        </span>
    </div> -->
    <label for="website-admin" class="block mb-2 text-sm font-medium text-neutral-800 dark:text-white">Username</label>
    <div class="flex mb-3">
      <span class="inline-flex items-center px-3 text-sm text-neutral-800 bg-neutral-200 border border-r-0 border-neutral-300 rounded-l-md dark:bg-neutral-600 dark:text-neutral-400 dark:border-neutral-600">
        @
      </span>
      <input disabled={!editing} value={$user.displayName} type="text" id="website-admin" class="rounded-none rounded-r-lg bg-neutral-50 border text-neutral-900 focus:ring-primary-500 focus:border-primary-500 block flex-1 min-w-0 w-full text-sm border-neutral-300 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="elonmusk">
    </div>
    <label for="input-group-1" class="block mb-2 text-sm font-medium text-neutral-800 dark:text-white">Email:</label>
    <div class="relative mb-3">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 text-neutral-500 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
      </div>
      <input disabled={!editing} value={$user.email} type="text" id="input-group-1" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@idris.com">
    </div>
</section>
<Drop/>
