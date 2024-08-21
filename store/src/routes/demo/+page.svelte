<script>
    import Ratings from "$lib/ratings.svelte";
</script>
<section class="prose lg:prose-xl flex flex-col items-center dark:child:text-white child:!my-2">
    <h1>Product card</h1>
    <div class="flex flex-col max-w-sm p-5 card child:!my-2 ">
        <div class="flex justify-center">
            <img src="/apple-watch.png" alt="apple watch" class="max-w-[90%]"></div>
        <p class="font-semibold text-xl">
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
        </p>
        <div class="flex">
            <Ratings/>
        </div>
        <div class="flex justify-between items-center ">
            <h1 class="!my-0 font-semibold dark:text-white text-neutral-700">$599</h1>
            <button class="button !m-0">
                Add to Cart
            </button>
        </div>
    </div>
</section>