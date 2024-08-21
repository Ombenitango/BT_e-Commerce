<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import Avatar from "$lib/avatar.svelte";
	import Review from "./review.svelte";
	import SetRating from "./setRating.svelte";

	import { userRating, user } from "../../../js/store";

	import { collection, addDoc, serverTimestamp, where, query, orderBy, getDocs } from "firebase/firestore";
	import { db } from "../../../js/firebase";

	let sort = "Top reviews";
	let indexBy = "createdOn";
	let collapse, resize, content, reviewInput, addReview;
	let reviews = [];

	let adding = false;

	$: {
		if (sort == "Newest") {
			indexBy = "createdOn";
		} else {
			indexBy = "rating";
		}
	}
	const getReview = async (sort) => {
		reviews = [];
		// TODO: work on the sorting-by-rating and sorting-by-newest
		let results = await getDocs(query(collection(db, "reviews"), where("product", "==", $page.params.id)/*, orderBy("createdOn")*/));
		results.docs.forEach((doc) => {
			reviews = [...reviews, doc.data()];
		});
		reviews = reviews.reverse();
		console.log({ reviews });
	};

	onMount(() => {
		getReview();
		addReview = async () => {
			if (reviewInput.value) {
				adding = true;
				let userReview = {
					content: reviewInput.value,
					rating: $userRating,
					product: $page.params.id,
					user: {
						uid: $user.uid,
						username: $user.displayName,
						photoURL: $user.photoURL ? $user.photoURL : null,
					},
					createdOn: serverTimestamp(),
				};
				await addDoc(collection(db, "reviews"), userReview);
				reviews = [...reviews, userReview];
				adding = false;
				reviewInput.value = "";
			}
		};

		resize = () => {
			if (collapse.style.display != "flex") {
				collapse.style.display = "flex";
			} else {
				collapse.style.display = "none";
			}
		};
	});
</script>

<div class="flex flex-col justify-center items-center prose-base">
	<div class="spacer"></div>
	<div class="flex w-full justify-between items-center">
		<h3 class="dark:text-white">Customer Reviews</h3>
		<div class="flex">
			<Avatar config={$user.photoURL ? { url: $user.photoURL } : { username: $user.displayName || "login" }} />
			<div class="relative rounded text-xs md:text-base w-20 md:w-32 ml-3">
				<span class="flex font-semibold items-center outline-neutral-800 outline outline-1 dark:outline dark:bg-neutral-700 py-2 px-3 w-full rounded overflow-hidden whitespace-nowrap text-ellipsis hover:rounded-b-none" on:keydown={() => {}} on:click={(e) => resize()}>
					<p class="!my-0 w-full">{sort}</p>
					<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m376 816-56-56 184-184-184-184 56-56 240 240-240 240Z"></path></svg>
				</span>
				<div class="flex-col hidden top-[110%] rounded absolute w-full mr-2 bg-neutral-50 dark:bg-neutral-700 border dark:border-neutral-600 border-neutral-700" bind:this={collapse}>
					<span
						class="p-2 pl-5 hover:bg-neutral-300 dark:hover:bg-neutral-600 w-full my-1 rounded"
						on:click={function () {
							sort = this.textContent;
							resize();
							getReview();
						}}>Top</span
					>
					<span
						class="p-2 pl-5 hover:bg-neutral-300 dark:hover:bg-neutral-600 w-full my-1 rounded"
						on:click={function () {
							sort = this.textContent;
							resize();
							getReview();
						}}>Newest</span
					>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-full px-5 py-2 my-5">
		<div class="w-full flex flex-col shadow bg-white dark:bg-neutral-700 mx-2 rounded-xl border-solid border-[1px] border-neutral-600 h-48">
			<SetRating class="px-3 pt-3" />
			<textarea bind:this={reviewInput} cols="30" rows="10" class="m-1 outline-none p-3 placeholder:text-current border-b-[1px] border-neutral-600 flex-[9]" placeholder="Write a review...." style="background: none;" />
			{#if adding}
				<svg xmlns="http://www.w3.org/2000/svg" class="stroke-neutral-700" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="48px" height="48" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
					<path fill="none" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(1);transform-origin:50px 50px">
						<animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate>
					</path>
				</svg>
			{:else}
				<button
					class="button w-fit scale-75 flex-[1]"
					on:click={() => {
						addReview();
					}}>Post review</button
				>
			{/if}
		</div>
	</div>
	<div class="flex flex-col w-full">
		{#each reviews as reviewData}
			<Review {reviewData} />
		{/each}
	</div>
</div>

<style>
	:global(.badge) {
		display: none;
	}
</style>
