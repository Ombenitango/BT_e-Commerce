<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	import { writable } from "svelte/store";

	import Payment from "./payment.svelte";
	import Checkout from "./checkout.svelte";
	import Item from "./item.svelte";
	import Stepper from "./stepper.svelte";

	import {ChevronRight} from "lucide-svelte"

	import { user, cartPrices, cartItems, round, currentStep } from "$js/store";

	// let orderTotal = 0;
	let subTotal = 0;

	export let form

	$: {
		subTotal = 0;
		for (let cartPrice of $cartPrices) {
			if (cartPrice) {
				subTotal = subTotal + cartPrice;
				// console.log($cartPrices,cartPrice,subTotal);
			}
		}
		subTotal = round(subTotal, -1);
		// orderTotal = subTotal + 2.5 + 3;
	}
</script>

<article class="prose dark:prose-invert prose-neutral lg:prose-xl max-w-none h-full flex-1 flex flex-col items-center">
	<Stepper {$currentStep} />
	{#if $currentStep == "Cart"}
		<section in:fly={{ x: 200, duration: 100 }} out:fly={{ x: -200, duration: 250 }} class="flex flex-col justify-center items-start h-full flex-1">
			{#if $cartItems.length > 0}
				<div class="flex flex-col justify-center px-2 max-h-full">
					{#each $cartItems as cartItem, index}
						<Item {cartItem} {index} />
					{/each}
				</div>
				<div class="flex w-full justify-end my-2">
					<button
						class="button flex items-center"
						on:keydown={() => {}}
						on:click={() => {
							$currentStep = "checkout";
						}}
					>
						Proceeed to checkout
						<ChevronRight size={24}/>
					</button>
				</div>
			{:else}
				<div class="flex-1 w-full min-w-[50vh] grid place-content-center child:text-neutral-700 dark:child:text-white">
					<h3><i>No Items</i></h3>
				</div>
			{/if}
		</section>
	{:else if $currentStep == "checkout"}
		<Checkout {subTotal} />
	{:else if $currentStep == "Payment"}
		<Payment />
	{:else if $currentStep=="Order placed"}
		<div class="pb-10">
			<div class="card p-8">
				<h5>Order placed successfully, thank you.</h5>
				<p class="text-base">We will contact you shortly</p>
				<a href="/">
					<button class="button">Home</button>
				</a>
			</div>
		</div>
	{/if}
</article>
