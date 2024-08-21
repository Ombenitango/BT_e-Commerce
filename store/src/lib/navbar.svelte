<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import Avatar from "$lib/avatar.svelte";

	import { auth } from "../js/firebase";
	import { signOut } from "firebase/auth";

	import anime from "../js/anime.es";
	import { filters, cartItems, user } from "../js/store";

	let searchTooltipHidden = true;

	let collapse, resizeSearch, resizeDrawer;
	let { categories, reviewSelection, categorySelection, sortSelection, urlParams, updateFilters } = $filters;
	$: {
		categorySelection = $filters.categorySelection;
		sortSelection = $filters.sortSelection;
		reviewSelection = $filters.reviewSelection;
	}
	let searchQuery = " ";

	let popularSearchProducts = [];
	const populate = (i) => {
		let random = Math.floor(Math.random() * 10);
		if (popularSearchProducts.indexOf($page.data.content.popular[random]) > -1) {
			populate(i);
			return;
		} else {
			popularSearchProducts[i] = $page.data.content.popular[random];
		}
	};

	onMount(() => {
		resizeSearch = () => {
			if (collapse.style.display != "flex") {
				collapse.style.display = "flex";
			} else {
				collapse.style.display = "none";
			}
		};

		resizeDrawer = () => {
			let parentElement = document.getElementById("drawer");
			if (parentElement.style.transform == " ") {
				parentElement.style.background = "none";
				anime({
					targets: "#drawer",
					translateX: "100%",
					easing: "easeInCubic",
					duration: 500,
				});
				setTimeout(() => {
					collapse.style.display = "none";
				}, 600);
			} else {
				parentElement.style.display = "flex";
				parentElement.style.background = "rgba(0,0,0,.5)";
				anime({
					targets: "#drawer",
					translateX: "0%",
					easing: "easeInCubic",
					duration: 500,
				});
			}
		};
	});
</script>

<nav class="bg-white border-neutral-200 px-2 sm:px-4 py-2.5 dark:bg-neutral-800 text-neutral-700 dark:text-white shadow-lg z-10">
	<div class="w-full flex flex-wrap items-center justify-between mx-auto md:mx-0">
		<a href="/" class="flex items-center">
			<img src="/logo.svg" class="w-10 h-10 !my-0 mr-2" alt="idris elecrto logo">

			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Idriselectro</span>
		</a>
		<div class="relative hidden flex-1 mx-5 md:block max-w-md">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg class="w-5 h-5 text-neutral-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
				<span class="sr-only">Search icon</span>
			</div>
			<input
				bind:value={searchQuery}
				on:keydown={(e) => {
					if (e.key == "Enter") {
						goto(`/search?q=${searchQuery}${sortSelection != "" ? "&sort=" + urlParams[sortSelection] : ""}${reviewSelection != "" ? "&rate=" + reviewSelection : ""}${categorySelection != "" ? "&category=" + categorySelection : ""}`);
						console.log({ reviewSelection });
					}
				}}
				on:click={() => {
				}}
				type="text"
				class="peer block outline-none w-full p-2 pl-10 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				placeholder="Search..."
			/>
			
		</div>
		<div class="flex md:order-2">
			<button type="button" on:click={resizeSearch()} data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700 rounded-lg text-sm p-2.5 mr-1">
				<svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
				<span class="sr-only">Search</span>
			</button>
			<a href="/cart" class="relative shadow mx-2 sm:mx-5 flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full border-primary border-2 p-2">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-primary w-6 h-6"><path d="M21 4H2v2h2.3l3.28 9a3 3 0 0 0 2.82 2H19v-2h-8.6a1 1 0 0 1-.94-.66L9 13h9.28a2 2 0 0 0 1.92-1.45L22 5.27A1 1 0 0 0 21.27 4 .84.84 0 0 0 21 4zm-2.75 7h-10L6.43 6h13.24z" /><circle cx="10.5" cy="19.5" r="1.5" /><circle cx="16.5" cy="19.5" r="1.5" /></svg>
				<span class="h-5 w-5 text-xs text-white bg-primary rounded-full absolute top-[-20%] left-0 flex justify-center items-center">{$cartItems.length}</span>
			</a>

			<!-- <div class="mx-2 flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg p-2" on:click={()=>{switchModes()}}>    
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="fill-neutral-500 w-6 h-6"><path d="M12 15q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm0 2q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05 4.575 6q-.3-.275-.288-.7.013-.425.288-.725.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7 0 .4-.275.7-.275.3-.687.287-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712 0-.413.275-.688.275-.3.688-.287.412.012.712.287L19.425 18q.3.275.288.7-.013.425-.288.725-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688.012-.412.287-.712L18 4.575q.275-.3.7-.288.425.013.725.288.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275.412 0 .687.275.3.275.288.688-.013.412-.288.712L6 19.425q-.275.3-.7.287-.425-.012-.725-.287ZM12 12Z"/></svg>
      </div> -->
			{#if $user && $user.emailVerified}
				<div class="flex">
					<Avatar config={{ url: $user.photoURL }} />
					<!-- <div class="flex flex-col items-center justify-center w-10 h-10 mx-2 shadow rounded-full bg-neutral-200 dark:bg-neutral-700">
            <span class="font-medium text-neutral-900 dark:text-neutral-300 uppercase">{$user.displayName.toString()[0]}</span>
        </div> -->
					<button
						on:keydown={() => {}}
						on:click={async () => {
							// console.log("clicked");
							await signOut(auth);
						}}
						class="hidden sm:block px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-50 rounded-lg">Log out</button
					>
				</div>
			{:else}
				<div class="flex svg:mr-2">
					<svg class="w-10 h-10 rounded-full dark:fill-neutral-400 fill-neutral-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" /></svg>
					<a href={`/auth?continueUrl=${$page.url.pathname}`}>
						<button class="hidden sm:block px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-50 rounded-lg"> Sign in </button>
					</a>
				</div>
			{/if}
			<button type="button" class="inline-flex items-center p-2 text-sm text-neutral-500 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600" aria-controls="navbar-search" aria-expanded="false" on:click={resizeDrawer()}>
				<span class="sr-only">Open menu</span>
				<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
			</button>
		</div>
		<div class="justify-center w-full flex md:hidden md:w-auto md:order-1 flex-col-reverse md:flex-col">
			<div class="relative mt-3 hidden" bind:this={collapse}>
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
					on:click={() => {
						goto(`/search?q=${searchQuery}&sort=${sortSelection == "Price:Low to High" ? "asc" : "desc"}`);
					}}
				>
					<svg class="w-5 h-5 fill-neutral-500" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
				</div>
				<input
					bind:value={searchQuery}
					on:keydown={(e) => {
						if (e.key == "Enter") {
							goto(`/search?q=${searchQuery}&sort=${sortSelection == "Price:Low to High" ? "asc" : "desc"}`);
						}
					}}
					type="text"
					id="search-navbar"
					class="peer block w-full p-2 pl-10 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="Search..."
				/>
				<div class="absolute hidden inset-x-0 top-[110%] bg-neutral-50 dark:bg-neutral-700 none peer-focus:flex flex-col rounded-lg py-5 px-2 border border-neutral-300 dark:border-neutral-600">
					<div class="w-ful mb-2 text-neutral-700 dark:text-neutral-400 text-base text-center border-current">
						Search for "{searchQuery}"
					</div>
					<!-- <div class="spacer !m-0 !my-2"></div> -->
					<div class="w-full flex overflow-x-scroll py-2">
						{#each categories as category}
							{#if category == categorySelection}
								<p
									class="mx-2 text-xs px-7 w-fit py-2 rounded-full shadow dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:border-solid border-none border-[1px] border-neutral-400 bg-neutral-700 hover:bg-neutral-600 dark:text-neutral-700 text-whiteelected"
									on:keydown={() => {}}
									on:click={() => {
										categorySelection = " ";
									}}
								>
									{category}
								</p>
							{:else}
								<p
									class="mx-2 text-xs px-7 w-fit py-2 rounded-full shadow bg-neutral-300 hover:bg-neutral-400 border-solid dark:border-none border-[1px] border-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-50"
									on:keydown={() => {}}
									on:click={() => {
										categorySelection = category;
									}}
								>
									{category}
								</p>
							{/if}
						{/each}
					</div>
					<div class="flex flex-col w-full">
						<!-- <p class="mt-3 text-neutral-700 dark:text-neutral-400 text-base">Popular products</p> -->
						<!-- <div class="spacer bg-neutral-400 !my-1"></div> -->
						<div class="flex w-full mt-1">
							<!-- <div class="w-24 aspect-[9/16] rounded-lg !bg-cover" style="background:url(/imac-front-image.png)" alt="imac"/> -->
							<!-- <div class="w-24 aspect-[9/16] rounded-lg !bg-cover" style="background:url(/apple-watch.png)" alt="apple watch"/> -->
							<img class="w-28 rounded-lg !bg-cover mr-5 hover:bg-neutral-300 dark:hover:bg-neutral-600 p-2" src="/imac-front-image.png" alt="imac" />
							<img class="w-28 rounded-lg !bg-cover hover:bg-neutral-300 dark:hover:bg-neutral-600 p-2" src="/imac-back-image.png" alt="apple watch" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div>
      
    </div> -->
	</div>
</nav>
