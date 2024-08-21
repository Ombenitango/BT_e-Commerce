<script>
    import { onMount } from "svelte";

    import {storage,auth} from "../js/firebase"
    import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
    import {updateProfile} from "firebase/auth"

    import anime from "../js/anime.es"
    import { user,round } from "../js/store"

    let modal

    let resize=()=>{
        anime({
            targets:"#dropzone",
            scale:["100%","70%"],
            easing:"linear",
            direction:"fowards",
            duration:100
        })
        setTimeout(()=>{modal.style.display="none"},100)

    }
    let error=null
    let progress=0
    let state=null
    let uploadTask
    const uploadDp=async (file)=>{
        const storageRef=ref(storage,"dp/"+file.name)
        uploadTask = uploadBytesResumable(storageRef,file)
        uploadTask.on("state_changed",snapshot=>{
            progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // console.log({state:snapshot.state});
            state=snapshot.state
        },
        error=>{
            switch(error.code){
                case 'storage/unauthorized':
                    error="User doesn't have permission to upload"
                    break;
                case 'storage/canceled':
                    error="upload cancelled"
                    break;
                case 'storage/unknown':
                    error="Unknown error occurred,"
                    break;
            }
        },
        async ()=>{
            state="completed"
            let url=await getDownloadURL(uploadTask.snapshot.ref)
            resize()
            await updateProfile($user,{photoURL:url})
            let temp=$user
            $user=temp
        }
        )
    }
</script>

<section id="modal" bind:this={modal} class={`${$$props.class} hidden justify-center items-center absolute inset-0 backdrop-blur-sm z-40`}>
    <div class="absolute inset-0" on:click={()=>{
        resize()
    }}></div>
    <label id="dropzone" for="dropzone-file" class="z-50 flex flex-col items-center justify-around w-full max-w-sm md:max-w-md lg:max-w-lg h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-neutral-500 dark:text-neutral-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" on:input={(e)=>{
            uploadDp(e.target.files[0])
        }}/>

{#if state=="running"}
        <div class="flex flex-col w-full items-center max-w-[80%]">
            <div class="w-full bg-neutral-200 rounded-full dark:bg-neutral-800">
                <div class="bg-primary-600 text-xs font-medium text-primary-100 text-center p-0.5 leading-none rounded-full" style={`width: ${progress}%`}> {round(progress,-1)}%</div>
            </div>
                <div class="button !px-3 !py-2 self-end mt-2" on:click={()=>{
                    uploadTask.cancel()
                }}>cancel</div>
            </div>
        {/if}

    </label>
</section>
