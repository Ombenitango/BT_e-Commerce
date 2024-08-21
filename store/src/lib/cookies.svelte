<script>
	import { cookieConsent } from "$js/store";
</script>

<div class="fixed left-0 bottom-0 p-5">
	<div class="card max-w-sm border-[1px] rounded-lg p-5">
        <h5 class="text-lg font-bold">Cookies</h5>
        <p class="text-sm">We use cookies, including third-party ones, for operational purposes, statistical analyses, personalized experiences, targeted content, and analyzing advertising campaign performance</p>
        <div class="flex gap-x-2 justify-end mt-2">
            <button class="button button-primary !py-2" on:click={()=>{$cookieConsent=true}}>Accept</button>
            <button class="button secondary" on:click={()=>{$cookieConsent=false}}>Decline</button>
        </div>
    </div>
</div>
