<script>
	import { format } from "date-fns";

	let total = 4002;
	let placementDate = new Date();
</script>

<article class="prose md:prose-xl xl:prose-2xl prose-neutral dark:prose-invert flex flex-col h-full w-full max-w-none mt-5 p-5 lg:p-10 gap-2">
	<div class="flex flex-col w-full gap-2">
		<h5 class="font-semibold text-2xl">Your Orders</h5>
		<p class="!my-0 text-base"><b>8 orders</b> placed</p>
	</div>
	<div class="flex flex-col items-start space-y-5 w-full max-w-2xl">
		<div class="flex flex-col rounded-lg w-full border dark:border-neutral-700 border-neutral-300">
			<div class="flex dark:bg-neutral-800 bg-neutral-100 border-b dark:border-neutral-700 border-neutral-300 text-xs px-5 py-2 rounded-t-lg prose-p:!my-1 space-x-8">
				<div>
					<p>ORDER PLACED</p>
					<p class="font-medium">{format(placementDate, "dd MMMM yyy")}</p>
				</div>
                <div>
					<p>TOTAL</p>
					<p class="font-medium">{new Intl.NumberFormat("sw-IN", { style: "currency", currency: "TZS" }).format(total)}</p>
				</div>

			</div>
			<div class=" px-5 py-2 h-20"></div>
		</div>
	</div>
</article>
