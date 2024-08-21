<script>
	let open = false;

	export let items, setter, getter;

	if (!getter) {
		setter(items[0])
	}
</script>

<div class="relative mb-6 flex w-full rounded-lg border border-neutral-300 bg-neutral-50 text-sm text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400">
	<span
		on:click={() => {
			open = !open;
		}}
		class="ml-1 flex w-full p-2.5 text-base outline-none focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500"
		placeholder="123-45-678"
		required
	>
		<p class="w-[100%] !my-0">{getter||items[0]}</p>
	</span>
	<div style={`display:${open ? "flex" : "none"}`} class=" absolute inset-x-0 top-[110%] z-20 h-56 flex-col rounded-lg border border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-600 dark:bg-neutral-900">
		<div class="flex flex-col overflow-y-scroll max-h-full">
			<!-- <span
                on:click={() => {
                    open = !open;
                }}
                class="flex items-center svg:fill-primary rounded px-5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z" /></svg>
                <p class="ml-2 !my-1">-&nbsp;Pick from a map&nbsp;-</p>
            </span> -->
			{#each items as item}
				<span
					on:click={() => {
						setter(item);
						open = !open;
					}}
					class="flex rounded px-5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
				>
					<!-- <p>{country.flag}</p> -->
					<p class="ml-2 !my-1">{item}</p>
				</span>
			{/each}
		</div>
	</div>
</div>
