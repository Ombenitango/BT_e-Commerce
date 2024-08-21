<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	import { auth } from "../../../js/firebase";
	import { applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

	import { form, field } from "svelte-forms";
	import { required, pattern } from "svelte-forms/validators";

	function equivalent() {
		return () => ({ valid: $password.value == $confirmPassword.value && $confirmPassword.value && $confirmPassword.value != " ", name: "passwords_not_match" });
	}
	let password = field("password", "", [required(), pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)], { validateOnChange: true });
	let confirmPassword = field("confirmPassword", null, [required(), equivalent()], { validateOnChange: true });

	let resetForm = form(password, confirmPassword);
	let errors = new Map();
	let names = Object.keys($resetForm.summary);
	let explanations = {
		pattern: `password must have least one lowercase letter, one uppercase letter, one digit, and one special character`,
		passwords_not_match: "passwords do not match",
	};
	function prune(error, name) {
		let regex = new RegExp(name + "\\.", "g");
		if (error.match(regex)?.[0]) {
			return [name, error.replace(regex, "")];
		} else {
			return null;
		}
	}

	let continueUrl;
	let state = "verifying";
	let errorMessage = null;
	let mode = "";
	let actionCode;

	function handleVerifyEmail(auth, actionCode) {
		applyActionCode(auth, actionCode)
			.then((resp) => {
				state = "verified";
			})
			.catch((error) => {});
	}
	function handlePasswordReset() {
		verifyPasswordResetCode(auth, actionCode)
			.then(() => {
				confirmPasswordReset(auth, actionCode, $password.value).then(() => {
					state = "reseted";
					setTimeout(()=>{
						goto("/")
					},1000)
				});
			})
			.catch((error) => {
				errorMessage = error.message;
			});
	}
	onMount(() => {
		mode = $page.url.searchParams.get("mode");
		actionCode = $page.url.searchParams.get("oobCode");
		if ($page.url.searchParams.get("continueUrl")) {
			continueUrl = $page.url.searchParams.get("continueUrl");
		} else {
			continueUrl = "/";
		}
		console.log(mode, actionCode);
		if (mode == "verifyEmail") {
			handleVerifyEmail(auth, actionCode);
		}
	});

	$: {
		if ($resetForm.errors.length > 0) {
			errors = new Map();
			for (let error of $resetForm.errors) {
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

<article class="prose lg:prose-xl prose-neutral dark:prose-invert max-w-none w-full h-full flex-1 flex justify-center items-center flex-wrap">
	<section class="flex flex-1 justify-center my-5">
		<div class="card w-full xs:max-w-sm mx-2 !rounded-xl md:max-w-lg p-5">
			{#if mode == "verifyEmail"}
				<section class="prose card p-5 child:!text-neutral-700 child:dark:!text-neutral-50">
					{#if state == "verifying"}
						<svg svg xmlns="http://www.w3.org/2000/svg" class="stroke-neutral-700 dark:stroke-neutral-400" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
							<path fill="none" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(1);transform-origin:50px 50px">
								<animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
							</path>
						</svg>
					{:else if state == "verified"}
						<div class="flex flex-col justify-center items-center w-72">
							<h3 class="text-neutral-700 dark:text-neutral-50">verified</h3>
							<a href={`/auth?continueUrl=${continueUrl}`} class="no-underline">
								<button class="button">continue</button>
							</a>
						</div>
					{/if}
				</section>
			{:else if mode == "resetPassword"}
				{#if state != "reseted" && state != "loading"}
					<h3 class="!mb-4 !mt-0">Choose a new password</h3>
					<div class="mb-3">
						<label for="password" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">New password</label>
						<input bind:value={$password.value} type="password" id="password" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none placeholder:text-2xl" placeholder=".........." required />
						{#if errors.get($password.name)}
							<p class="text-xs text-red-400 !my-1">{explanations[errors.get($password.name)]}</p>
						{/if}
					</div>
					<div class="mb-3">
						<label for="confirmPassword" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Confirm password</label>
						<input bind:value={$confirmPassword.value} type="password" id="confirmPassword" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none placeholder:text-2xl" placeholder=".........." required />
						{#if errors.get($confirmPassword.name)}
							<p class="text-xs text-red-400 !my-1">{explanations[errors.get($confirmPassword.name)]}</p>
						{/if}
					</div>
					<div class="flex justify-end pt-3">
						<button
							class="button"
							disabled={!$resetForm.valid}
							on:click={async () => {
								await resetForm.validate();
								if ($resetForm.valid) {
									handlePasswordReset();
									state = "loading";
								}
							}}>Reset password</button
						>
					</div>
				{:else if state == "loading"}
					<div class="flex justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-neutral-700 dark:stroke-white" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
							<path fill="none" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(1);transform-origin:50px 50px">
								<animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
							</path>
						</svg>
					</div>
				{:else}
					<div class="flex flex-col items-center svg:fill-current">
						<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q63 0 119.5 18T704-812l-61 61q-36-21-77-33t-86-12q-131 0-223.5 92.5T164-480q0 131 92.5 223.5T480-164q131 0 223.5-92.5T796-480q0-17-1.5-32.5T790-543l68-68q11 31 16.5 63.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-55-217L254-469l59-59 113 113 395-395 59 58-455 455Z" /></svg>
						<h5>Password reset successful</h5>
					</div>
				{/if}
			{/if}
			{#if errorMessage}
				<div class="flex justify-center">
					<p class="text-sm !text-red-500 !my-1">{errorMessage}</p>
				</div>
			{/if}
		</div>
	</section>
</article>
