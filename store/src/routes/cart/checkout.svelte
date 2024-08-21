<script>
	import { form, field } from "svelte-forms";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { fly } from "svelte/transition";
	import { required, email, min, pattern } from "svelte-forms/validators";
	import { v4 } from "uuid";

	import Dropdown from "$lib/dropdown.svelte";
	import { Loader2 } from "lucide-svelte";

	import { serverAction, currentStep, user, cartItems, updateSnacks } from "$js/store";
	import { regions } from "$js/data";
	import { addDocument } from "$js/firebase";

	// const orderPlaced = false;

	export let subTotal;

	let tax = 1000;
	let shippingEstimate = 25000;

	// let deliveryOpen = false;
	let placementLoading = false;
	let cityListOpen = false;

	console.log($user);

	let emailInput = field("email", $user.email, [required(), email()], {
		validateOnChange: true,
	});
	let firstName = field("firstName", $user.displayName, [required(), min(3)], { validateOnChange: true });
	let lastName = field("lastName", null, [required(), min(3)], { validateOnChange: true });
	let city = field("city", "", [required(), min(4)], { validateOnChange: true });
	let phoneNumber = field("phoneNumber", "", [required(), pattern(/^(?:\+|[0-9])?(?:[0-9] ?){6,14}[0-9]$/)], { validateOnChange: true });
	let address = field("address", "", [required(), min(6)], { validateOnChange: true });

	let contactInfo = form(emailInput, firstName, lastName, phoneNumber, address, city);

	const explanations = {
		not_an_email: "It is not a valid email address",
		pattern: "invalid phone number",
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

<section class="flex flex-wrap md:flex-nowrap rounded justify-center items-start h-full flex-1 pb-5">
	<div in:fly={{ x: 200, duration: 100 }} out:fly={{ x: -200, duration: 250 }} class="flex flex-col px-5">
		<div class="flex flex-col max-w-sm p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 shadow">
			<h5 class="!my-2">Contact Information</h5>
			<div class="mb-3">
				<label for="email" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">Email address</label>
				<input bind:value={$emailInput.value} type="email" id="email" class="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Enter your email" required />
				{#if errors.get($emailInput.name)}
					<p class="text-xs text-red-400 !my-1">{explanations[errors.get($emailInput.name)]}</p>
				{/if}
			</div>
		</div>
		<div class="flex flex-col max-w-lg p-3 mt-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 shadow">
			<h5 class="!my-2">Shipping Information</h5>
			<div class="flex flex-wrap items-start child:min-w-[150px]">
				<div class="mb-4 flex-1 mr-1 relative">
					<label for="first" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">First name</label>
					<input bind:value={$firstName.value} type="text" class="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="First name" required />
					{#if errors.get($firstName.name)}
						<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($firstName.name)]}</p>
					{/if}
				</div>
				<div class="mb-3 flex-1 ml-1 relative">
					<label for="last" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">Last name</label>
					<input bind:value={$lastName.value} type="text" id="last" class="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Last name" required />
					{#if errors.get($lastName.name)}
						<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($lastName.name)]}</p>
					{/if}
				</div>
			</div>
			<div class="mt-1 mb-3">
				<label for="user" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">Phone Number</label>
				<input bind:value={$phoneNumber.value} type="text" id="user" class="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Enter your phone number" required />
				{#if errors.get($phoneNumber.name)}
					<p class="text-xs text-red-400 !my-1">{explanations[errors.get($phoneNumber.name)]}</p>
				{/if}
			</div>
			<div class="mt-1 mb-3">
				<label for="user" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">City</label>
				<Dropdown items={regions.map((region) => region.name)} getter={$city.value} setter={(value) => ($city.value = value)} />
				<!-- <input bind:value={$city.value} type="text" id="user" class="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Enter your city" required /> -->
				{#if errors.get($city.name)}
					<p class="text-xs text-red-400 !my-1">{explanations[errors.get($city.name)]}</p>
				{/if}
			</div>
			<div class="mt-1 mb-3">
				<label for="user" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">Address</label>
				<input bind:value={$address.value} type="text" id="user" class="bg-neutral-50 border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Enter your phone number" required />
				{#if errors.get($address.name)}
					<p class="text-xs text-red-400 !my-1">{explanations[errors.get($address.name)]}</p>
				{/if}
			</div>
			<!-- <div class="mt-1 mb-3">
				<label for="user" class="block mb-2 text-sm font-medium text-neutral-700 dark:text-white">Delivery point</label>
				<div class="relative mb-6 flex w-full rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400">
					<span
						on:click={() => {
							deliveryOpen = !deliveryOpen;
						}}
						class="ml-1 flex w-full p-2.5 text-base outline-none focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500"
						placeholder="123-45-678"
						required
					>
						<p class="w-[100%] !my-0">{$currentDeliveryPoint.name}</p>
					</span>
					<div style={`display:${deliveryOpen ? "flex" : "none"}`} class=" absolute inset-x-0 top-[110%] z-20 h-56 flex-col rounded-lg border border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-600 dark:bg-neutral-900">
						<div class="flex flex-col overflow-y-scroll max-h-full">
							<span
								on:click={() => {
									deliveryOpen = !deliveryOpen;
									// $currentDeliveryPoint=point
								}}
								class="flex items-center svg:fill-primary rounded px-5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
							>
								<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z" /></svg>
								<p class="ml-2 !my-1">-&nbsp;Pick from a map&nbsp;-</p>
							</span>
							{#each deliveryPoints as point}
								<span
									on:click={() => {
										deliveryOpen = !deliveryOpen;
										$currentDeliveryPoint = point;
									}}
									class="flex rounded px-5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
								>
									<p class="ml-2 !my-1">{point.name}</p>
								</span>
							{/each}
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
	<div class="w-80 card p-5 mx-5 sticky top-0">
		<div class="w-full grid grid-cols-[8fr\x2fr] grid-rows-4 child:!my-2 text-base dark:child:text-white child:text-neutral-700">
			<!-- <span class="child:!my-0 flex justify-between px-2 py-1"> -->
			<p class="" style="grid-row: 1;grid-column: 1;">Sub total</p>
			<p class="font-semibold" style="grid-row: 1;grid-column: 2;">{new Intl.NumberFormat("sw-IN", { style: "currency", currency: "TZS" }).format(subTotal)}</p>
			<!-- </span> -->
			<!-- <div class="spacer-xs"></div> -->
			<!-- <span class="child:!my-0 flex justify-between p-2 py-1"> -->
			<p style="grid-row: 2;grid-column: 1;">Shipping</p>
			<p class="font-semibold" style="grid-row: 2;grid-column: 2;">{new Intl.NumberFormat("sw-IN", { style: "currency", currency: "TZS" }).format(shippingEstimate)}</p>

			<!-- </span> -->
			<!-- <div class="spacer-xs"></div> -->
			<!-- <span class="child:!my-0 flex justify-between px-2 py-1"> -->
			<p class="valkyr" style="grid-row: 3;grid-column: 1;">Tax estimate</p>
			<p class="font-semibold valkyr" style="grid-row: 3;grid-column: 2;">{new Intl.NumberFormat("sw-IN", { style: "currency", currency: "TZS" }).format(tax)}</p>

			<!-- </span> -->
			<!-- <div class="spacer-xs"></div> -->
			<!-- <span class="child:!my-0 flex justify-between px-2 py-1"> -->
			<h6 class="font-semibold" style="grid-row: 4;grid-column: 1;">Order total</h6>
			<p class="font-semibold" style="grid-row: 4;grid-column: 2;">{new Intl.NumberFormat("sw-IN", { style: "currency", currency: "TZS" }).format(subTotal + shippingEstimate + tax)}</p>

			<!-- </span> -->
		</div>

		<button
			class="button w-full !mt-2 flex justify-center"
			disabled={placementLoading}
			on:clicks={() => {
				if ($user.emailVerified) {
					$currentStep = "checkout";
				} else {
					goto(`/auth?continueUrl=${$page.url.pathname}`);
				}
			}}
			on:click={async (e) => {
				e.preventDefault();
				await contactInfo.validate();
				// console.log($cartItems);

				if ($contactInfo.valid) {
					placementLoading = true;
					try {
						let result=await serverAction("/cart",{
							name:$firstName.value+" "+$lastName.value,
							userID:$user.uid,
							email:$user.email,
							phone:$phoneNumber.value,
							address:$address.value,
							city:$city.value,
							products:$cartItems.map((item) => ({ _key: v4(), _ref: item._id, _type: "reference" })),
							total:subTotal + shippingEstimate + tax,
							status:"pending"
						}) 
						console.log(result);
						if(result.status==200){
							// updateSnacks("Order placed successfully", "add", "success");
							$currentStep = "Order placed";
							$cartItems=[]
							setTimeout(() => {
								$currentStep = "Cart";
							}, 2000);
						}
					} catch (error) {
						console.log(error);
						updateSnacks(null, "add", "error");
					}
				} else {
					console.log("Invalid", $contactInfo.errors);
				}
			}}
		>
			{#if placementLoading}
				Placing order...
				<Loader2 class="w-5 h-5 ml-2 animate-spin" />
			{:else}
				Place order
			{/if}
		</button>
	</div>
</section>
