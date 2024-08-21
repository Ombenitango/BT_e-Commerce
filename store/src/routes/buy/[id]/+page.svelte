<script>
	import Reviews from "./reviews.svelte";
	import Ratings from "$lib/ratings.svelte";

	import { onMount } from "svelte";
	import anime from "../../../js/anime.es";
	import { updateSnacks, cartItems } from "../../../js/store";

	export let data;
	let carousel;
	// console.log(data);
	// let coursel
	$: {
		if (carousel && carousel.children) {
			anime({
				targets: carousel.children,
				translateX: anime.stagger("-100%"),
				duration: 500,
				endDelay: 4500,
				easing: "linear",
				loop: true,
				delay: anime.stagger(5000),
			});
			// console.log(carousel.children.length);
		}
	}
	onMount(() => {});
	// $:{
	//   console.log({coursel});
	// }
</script>

<article class="prose prose-neutral dark:prose-invert md:prose-xl flex justify-center items-center h-full w-full max-w-none lg:m-10 mt-5">
	<section class="card m-4 w-full md:mx-10 lg:w-10/12 p-2 xs:p-5 flex flex-col justify-evenly">
		<h3 class="text-current !mb-2 !my-2 max-w-[30ch] lg:max-w-[40ch] overflow-hidden" style="-webkit-line-clamp: 2;display:-webkit-box;-webkit-box-orient: vertical;">{data.title}</h3>
		<h4 class="text-current !mb-2">{new Intl.NumberFormat("sw-IN", { style: "currency", currency: "TZS" }).format(data.price)}</h4>
		<div class="flex child:flex-shrink-0 overflow-x-hidden relative" id="coursel" bind:this={carousel}>
			<!-- <div class="absolute h-full inset-0 z-10"> -->
			<!-- <div class="skeleton w-full h-full"></div> -->
			<!-- </div> -->
			{#each data.gallery as galleryItem, index}
				<div class="h-60 md:h-96 flex dark:bg-neutral-500 bg-neutral-200 w-full justify-center rounded-md py-5">
					<img src={galleryItem} alt="" class="!my-0" />
				</div>
			{/each}
		</div>
		<div class="flex flex-wrap">
			{#each data.gallery as galleryItem}
				<div class="h-16 w-16 md:h-28 md:w-28 flex dark:border-neutral-700 border-neutral-200 justify-center rounded mr-1 my-1 md:mr-2 md:my-2">
					<img src={galleryItem} alt="" class="!my-0" />
				</div>
			{/each}
		</div>
		<Ratings class="!mt-5 !mb-2 svg:sm:!w-7 svg:sm:!h-7" rate={data.ratings.rate} badge={false} />
		<div>
			<h4 class="text-current !my-2">Details</h4>
			<p class="mb-2 text-neutral-500">{data.details}</p>
		</div>
		<div class="mb-4">
			<h4 class="text-current !mt-0 !mb-2">Colors</h4>
			<div class="flex">
				{#each data.colors as color}
					{@const { r, g, b } = color.rgb}
					<span class="w-5 p-1 h-5 rounded-full mx-2 block" style={`background:rgb(${r},${g},${b});`} />
				{/each}
			</div>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 text-base mb-3">
			<span class="dark:bg-neutral-700 bg-neutral-300 rounded-xl p-3 flex flex-col">
				<p class="font-semibold !my-0">Ships from</p>
				<p class="!my-1 text-neutral-400">Dar es salaam</p>
			</span>
			<a href={`/category/${data.category}`} class="no-underline dark:bg-neutral-700 bg-neutral-300 rounded-xl p-3 flex flex-col">
				<p class="font-semibold !my-0">Category</p>
				<p class="!my-1 text-neutral-400">{data.category}</p>
			</a>
			<span class="dark:bg-neutral-700 bg-neutral-300 rounded-xl p-3 flex flex-col">
				<p class="font-semibold !my-0">Product State</p>
				<span class="flex w-fit px-2 pr-4 my-1 rounded items-center bg-primary-800 text-white">
					<svg aria-hidden="true" class="w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
					<p class="!m-0"><sub class="!static">New</sub></p>
				</span>
			</span>
			<span class="dark:bg-neutral-700 bg-neutral-300 rounded-xl p-3 flex flex-col">
				<p class="font-semibold !my-0">Shipping</p>
				<p class="!my-1 text-neutral-400 flex">
					<svg class="w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
					National wide
				</p>
			</span>

			<span class="dark:bg-neutral-700 bg-neutral-300 rounded-xl p-3 flex flex-col">
				<p class="font-semibold !my-0">Dimensions (cm)</p>
				<p class="!my-1 text-neutral-400">{data.dimensions}</p>
			</span>
			<span class="dark:bg-neutral-700 bg-neutral-300 rounded-xl p-3 flex flex-col">
				<p class="font-semibold !my-0">Item weight</p>
				<p class="!my-1 text-neutral-400">{data.weight}</p>
			</span>
		</div>
		<div class="flex justify-end">
			<button
				class="button flex items-center"
				on:click={() => {
					console.log(data);

					$cartItems = [...$cartItems, { mainImage: data.mainImage, _id: data._id, title: data.title, price: data.price, category: data.category }];
					updateSnacks(null, "add", "added");
				}}
			>
				<!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current mr-2"><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path><path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path></svg> -->
				Add to cart
			</button>
		</div>
		<Reviews />
	</section>
</article>
<!-- [
    {
      mainImage: {
        asset: {
          url: 'https://cdn.sanity.io/images/s02bznjg/production/8223bcb11a8a303109e62349dd155f2933675f0d-640x480.jpg'
        }
      },
      _id: 'EU5h49cUwchkpvcWDoO6S8',
      title: 'Acer Swift 3 14" FHD Touch Laptop, Intel i5-1240P, 16GB RAM, 512GB SSD, Win 11 Home SF314-512T-56CT',
      price: 921152,
      ratings: { rate: 0, count: 0 }
    }
  ] -->
