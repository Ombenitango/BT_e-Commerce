<script>
	// let steps = ["Cart", "checkout", "Payment"];
	let steps = ["Cart", "checkout", "Order placed"];

	import { ChevronsRight } from "lucide-svelte";

	import { currentStep, cartItems } from "../../js/store";
</script>

<section class="flex justify-center py-5 cursor-pointer">
	<div class="flex max-w-xl lg:max-w-2xl items-center p-3 rounded-lg bg-neutral-100 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800">
		{#each steps as step, index}
			{#if step == $currentStep}
				<div class="flex items-center text-primary">
					<div class="flex flex-colz text-xs sm:text-base items-center">
						<div class="w-8 h-8 grid place-content-center rounded-full border border-primary">
							<p class="!m-0 !p-0">{index + 1}</p>
						</div>
						<p class="!my-0 !p-0 ml-2">{step}</p>
					</div>
					{#if index != 2}
						<ChevronsRight class="mx-2" size={24} />
						<!-- <svg class="fill-primary mx-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-240-56-56 183-184-183-184 56-56 240 240-240 240Zm264 0-56-56 183-184-183-184 56-56 240 240-240 240Z" /></svg> -->
					{/if}
				</div>
			{:else}
				<div
					class="flex items-center"
					on:keydown={() => {}}
					on:click={() => {
						if ($cartItems.length == 0 || step == "Order placed") return;
						$currentStep = step;
					}}
				>
					<div class="flex flex-colz text-xs sm:text-base items-center">
						<div class="w-8 h-8 grid place-content-center rounded-full border border-current text-current">
							<p class="!m-0 !p-0">{index + 1}</p>
						</div>
						<p class="text-current !my-0 !p-0 ml-2">{step}</p>
					</div>
					{#if index != 2}
						<ChevronsRight class="mx-2" size={24} />
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</section>
