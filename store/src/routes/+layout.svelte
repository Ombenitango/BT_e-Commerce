<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import Analytics from "$lib/analytics.svelte";
	import Cookies from "$lib/cookies.svelte";

	import Navbar from "$lib/navbar.svelte";
	import Drawer from "$lib/drawer.svelte";
	import Footer from "$lib/footer.svelte";
	import Snackbar from "$lib/snackbar.svelte";

	import "../style/tailwind.css";

	import { colorTheme, user, cookieConsent } from "$js/store";
	import { auth } from "$js/firebase";
	import { onAuthStateChanged, signOut } from "firebase/auth";

	$: {
		if ($colorTheme == "light") {
			document.body.classList.remove("light");
			document.body.classList.add("dark");
		} else if ($colorTheme == "dark") {
			document.body.classList.remove("dark");
			document.body.classList.add("light");
		}
	}

	onMount(() => {
		$colorTheme = localStorage.getItem("colorTheme") || "light";
		onAuthStateChanged(auth, (userState) => {
			// console.log("auth changes",userState);
			if (!userState) {
				$user = {};
			} else {
				$user = userState;
			}
			if (userState && !userState.emailVerified) {
				$user = {};
				signOut(auth);
			}
		});
	});
</script>

<main class="dark:bg-neutral-900 min-h-[100vh] h-full relative flex flex-col overflow-x-hidden">
	<Drawer />
	<Navbar />
	<!-- <main class="z-[2]"> -->
	<slot />
	<!-- </main> -->
	{#if $page.route.id != "/auth"}
		<Footer />
	{/if}
	<Snackbar />
    <Analytics />
	<!-- {#if $cookieConsent}
	{:else}
		<Cookies />
	{/if} -->
</main>
