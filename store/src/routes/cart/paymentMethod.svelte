<script>
	export let data;
	import { paymentMethod } from "../../js/store";
</script>

{#if $paymentMethod == data.name}
	<div
		class="flex flex-col bg-primary dark:bg-primary-900 bg-opacity-[0.15] dark:bg-opacity-[0.15] border rounded-lg border-primary-500 dark:border-primary-900 p-4 max-w-xs mx-2"
		on:keydown={() => {}}
		on:click={() => {
			$paymentMethod = data.name;
		}}
	>
		<input type="radio" name="" id="" class="w-fit mt-2 mb-4 accent-primary" checked="checked" />
		<div class="flex items-center">
			<h6 class="text-base text-neutral-700 dark:text-white">{data.name}</h6>
			{#each data.images as image}
				<img src={image.src} alt={image.alt} class="h-2 !my-0 ml-2" />
			{/each}
		</div>
		<p class="!my-2 text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio repellendus totam alias reprehenderit debitis a numquam, magnam amet</p>
	</div>
{:else}
	<div
		class="flex flex-col bg-neutral-50 dark:bg-neutral-800 border rounded-lg border-neutral-300 dark:border-neutral-700 p-4 max-w-xs mx-2"
		on:keydown={() => {}}
		on:click={() => {
			$paymentMethod = data.name;
		}}
	>
		<input type="radio" name="" id="" class="w-fit mt-2 mb-4 accent-primary" />
		<div class="flex items-center">
			<h6 class="text-base text-neutral-700 dark:text-white">{data.name}</h6>
            {#each data.images as image}
				<img src={image.src} alt={image.alt} class="h-2 !my-0 ml-2" />
			{/each}
		</div>
		<p class="!my-2 text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio repellendus totam alias reprehenderit debitis a numquam, magnam amet</p>
	</div>
{/if}
