<script>
	import { fly } from "svelte/transition";
	import { writable } from "svelte/store";

	import { form, field } from "svelte-forms";
	import { required, email, min, pattern } from "svelte-forms/validators";

	import PaymentMethod from "./paymentMethod.svelte";

	const paymentMethods = [
		{
			name: "Credit card",
			images: [
				{
					src: "/visa.svg",
					alt:"Visa"
				},
				{
					src: "/mastercard.svg",
					alt:"Mastercard"
				}
			],
		},
		{
			name: "M-PESA",
			images: [
				{
					src: "/mpesa.svg",
					alt:"Mpesa"
				}
			],
		},
	];

	let emailInput = field("email", null, [required(), email()], {
		validateOnChange: true,
	});
	let firstName = field("firstName", null, [required(), min(3)], { validateOnChange: true });
	let lastName = field("lastName", null, [required(), min(3)], { validateOnChange: true });
	let city = field("city", "", [required(), min(4)], { validateOnChange: true });
	let cardNumber = field("cardNumber", "", [pattern(/^4[0-9]{12}(?:[0-9]{3})?$/)], { validateOnChange: true });

	let contactInfo = form(emailInput, firstName, lastName, city, cardNumber);

	const explanations = {
		not_an_email: "It is not a valid email address",
		pattern: "invalid card number",
		min: "Value is too short",
		passwords_not_match: "passwords do not match",
	};

	let names = Object.keys($contactInfo.summary);
	let errors = new Map();
	function prune(error, name) {
		let regex = new RegExp(name + "\\.", "g");
		if (error.match(regex)?.[0]) {
			return [name, error.replace(regex, "")];
		} else {
			return null;
		}
	}

	$: {
		if ($contactInfo.errors.length > 0) {
			errors = new Map();
			for (let error of $contactInfo.errors) {
				for (let name of names) {
					if (prune(error, name)) {
						let [prunedName, dryError] = prune(error, name);
						errors.set(prunedName, dryError);
					}
					if (prune(error, name)) {
						let [prunedName, dryError] = prune(error, name);
						errors.set(prunedName, dryError);
					}
				}
			}
		}
	}
</script>

<section in:fly={{ x: 200, duration: 100 }} out:fly={{ x: -200, duration: 250 }} class="flex flex-col p-5">
	<h5 class="primary !text-neutral-700 dark:!text-white text-xl">Make payment with</h5>
	<p>Choose a payment method to complete the purchase</p>
	<div class="flex py-3">
		{#each paymentMethods as data}
			<PaymentMethod {data}/>
		{/each}
		<!-- <div
			class="flex flex-col bg-primary dark:bg-primary-900 bg-opacity-[0.15] dark:bg-opacity-[0.15] border rounded-lg border-primary-500 dark:border-primary-900 p-4 max-w-xs mr-3"
			on:keydown={() => {}}
			on:click={() => {
				paymentMethod = "visa";
			}}
		>
			<input type="radio" name="" id="" class="w-fit mt-2 mb-4 accent-primary" checked="checked" />
			<div class="flex items-center">
				<h6 class="text-base text-neutral-700 dark:text-white">Credit Card</h6>
				<img src="/mastercard.svg" alt="mastercard" class="h-2 !my-0 ml-2" />
				<img src="/visa.svg" alt="mastercard" class="h-2 !my-0 ml-2" />
			</div>
			<p class="!my-2 text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio repellendus totam alias reprehenderit debitis a numquam, magnam amet</p>
		</div> -->
		<!-- <div
			class="flex flex-col bg-neutral-50 dark:bg-neutral-800 border rounded-lg border-neutral-300 dark:border-neutral-700 p-4 max-w-xs"
			on:keydown={() => {}}
			on:click={() => {
				paymentMethod = "mpesa";
			}}
		>
			<input type="radio" name="" id="" class="w-fit mt-2 mb-4 accent-primary" />
			<div class="flex items-center">
				<h6 class="text-base text-neutral-700 dark:text-white">M-Pesa</h6>
				<img src="/mpesa.svg" alt="mastercard" class="h-3 !my-0 ml-2" />
			</div>
			<p class="!my-2 text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio repellendus totam alias reprehenderit debitis a numquam, magnam amet</p>
		</div> -->
	</div>
	<div class="spacer" />
	<div class="flex flex-col bg-neutral-50 dark:bg-neutral-800 py-5 px-2 shadow rounded-lg">
		<div class="flex my-2">
			<div class="mb-4 px-2 flex-1 mr-1 relative">
				<label for="first" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">Card name</label>
				<input bind:value={$firstName.value} type="text"  class="bg-neutral-50 border border-neutral-500 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Full name" required />
				{#if errors.get($firstName.name)}
					<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($firstName.name)]}</p>
				{/if}
			</div>
			<div class="mb-4 px-2 flex-1 mr-1 relative">
				<label for="first" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">Card number</label>
				<input bind:value={$cardNumber.value} type="text"  class="bg-neutral-50 border border-neutral-500 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" pattern="^4[0-9]{12}(?:[0-9]{3})?$" placeholder="1234 1234 1234" required />
				{#if errors.get($cardNumber.name)}
					<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($cardNumber.name)]}</p>
				{/if}
			</div>
		</div>
		<div class="flex my-2">
			<div class="mb-4 px-2 flex-1 mr-1 relative">
				<label for="first" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">First name</label>
				<input bind:value={$firstName.value} type="text"  class="bg-neutral-50 border border-neutral-500 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="First name" required />
				{#if errors.get($firstName.name)}
					<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($firstName.name)]}</p>
				{/if}
			</div>
			<div class="mb-4 px-2 flex-1 mr-1 relative">
				<label for="first" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">First name</label>
				<input bind:value={$firstName.value} type="text"  class="bg-neutral-50 border border-neutral-500 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="First name" required />
				{#if errors.get($firstName.name)}
					<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($firstName.name)]}</p>
				{/if}
			</div>
			<div class="mb-4 px-2 flex-1 mr-1 relative">
				<label for="first" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">First name</label>
				<input bind:value={$firstName.value} type="text"  class="bg-neutral-50 border border-neutral-500 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="First name" required />
				{#if errors.get($firstName.name)}
					<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($firstName.name)]}</p>
				{/if}
			</div>
		</div>
	</div>
</section>
