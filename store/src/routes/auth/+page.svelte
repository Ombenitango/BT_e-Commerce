<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { form, field } from "svelte-forms";
	import { required, email, pattern } from "svelte-forms/validators";

	import { user } from "../../js/store";
	import { auth } from "../../js/firebase";
	import { signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
	const googleProvider = new GoogleAuthProvider();

	let continueUrl;

	if ($page.url.searchParams.get("continueUrl")) {
		continueUrl = $page.url.searchParams.get("continueUrl");
	} else {
		continueUrl = "/";
	}

	let emailInput = field("email", null, [required(), email()]);
	let password = field("password", "", [required(), pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)]);
	let signin = form(emailInput, password);

	let names = Object.keys($signin.summary);
	let errors = new Map();
	let errorState = null;
	let errorMessage = null;
	let signinState = null;
	let explanations = {
		not_an_email: `It is not a valid email`,
		pattern: `password must have least one lowercase letter, one uppercase letter, one digit, and one special character`,
		min: "it must be at least 2 characters long",
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

	async function signinUser() {
		try {
			signinState = "...";
			await signInWithEmailAndPassword(auth, $emailInput.value, $password.value)
				.then((userCredentials) => {
					$user = userCredentials.user;
					console.log($user);
					if ($user && $user.emailVerified) {
						goto(continueUrl);
					} else {
						signOut(auth);
					}
				})
				.catch((error) => {
					errorState = error;
					errorMessage = "wrong email or password";
				});
		} catch (error) {
			errorState = error;
			errorMessage = "Account not found";
			console.log(error);
		}
	}
	async function googleAuth() {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				$user = result.user;
				goto(continueUrl);
			})
			.catch((error) => {
				errorMessage = error.message;
			});
	}
	$: {
		if ($signin.errors.length > 0) {
			errors = new Map();
			for (let error of $signin.errors) {
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
	onMount(() => {});
</script>

<article class="prose lg:prose-xl max-w-none w-full h-full flex-1 flex justify-center items-center flex-wrap">
	<section class="flex flex-1 justify-center my-5">
		<div class="card w-full xs:max-w-sm mx-2 !rounded-xl md:max-w-lg p-6 child:!text-neutral-700 child:dark:!text-white">
			<h2 class="!my-1">Welcome Back</h2>
			<p class="!my-2 text-base !mb-4">Don’t have an account? <a href={`/auth/register?continueUrl=${continueUrl}`} class="text-primary">Sign up.</a></p>
			<div class="flex justify-between child:!text-neutral-700 dark:child:!text-neutral-50">
				<span
					class="flex items-center xs border-solid border-[1px] border-current px-5 py-0 rounded-md"
					on:click={async () => {
						await googleAuth();
					}}
				>
					<svg class="w-10 h-10" width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M120 76.1C120 73 119.7 69.8 119.2 66.8H75.9V84.5H100.7C99.7 90.2 96.4 95.2 91.5 98.4L106.3 109.9C115 101.8 120 90 120 76.1Z" fill="#4280EF" />
						<path d="M75.9 120.9C88.3 120.9 98.7 116.8 106.3 109.8L91.5 98.4C87.4 101.2 82.1 102.8 75.9 102.8C63.9 102.8 53.8 94.7 50.1 83.9L34.9 95.6C42.7 111.1 58.5 120.9 75.9 120.9Z" fill="#34A353" />
						<path d="M50.1 83.8C48.2 78.1 48.2 71.9 50.1 66.2L34.9 54.4C28.4 67.4 28.4 82.7 34.9 95.6L50.1 83.8Z" fill="#F6B704" />
						<path d="M75.9 47.3C82.4 47.2 88.8 49.7 93.5 54.2L106.6 41C98.3 33.2 87.3 29 75.9 29.1C58.5 29.1 42.7 38.9 34.9 54.4L50.1 66.2C53.8 55.3 63.9 47.3 75.9 47.3Z" fill="#E54335" />
					</svg>
					<p class="hidden sm:block ml-1 max-w-[12ch] whitespace-nowrap overflow-hidden text-ellipsis text-xs md:max-w-none md:whitespace-normal md:text-base font-semibold !my-0">Login with Google</p>
					<!-- <p class="hidden sm:block ml-1 text-xs md:text-base font-semibold !my-0">Login with Google</p> -->
				</span>
				<span class="flex items-center border-solid border-[1px] border-current px-5 py-0 rounded-md">
					<svg class="w-10 h-10 fill-[#3B5998]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" /></svg>
					<p class="hidden sm:block ml-1 max-w-[12ch] whitespace-nowrap overflow-hidden text-ellipsis text-xs md:max-w-none md:whitespace-normal md:text-base font-semibold !my-0">Login with Facebook</p>
					<!-- <p class="hidden sm:block ml-1 text-xs md:text-base font-semibold !my-0">Login with Apple</p> -->
				</span>
			</div>
			<div class="flex items-center !my-5">
				<div class="line mr-4" />
				<p class="text-base font-semibold !p-0 !my-0">or</p>
				<div class="line ml-4" />
			</div>
			<div class="flex flex-col">
				<div class="mb-3">
					<label for="email" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Email address</label>
					<input bind:value={$emailInput.value} type="email" id="email" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Enter your email" required />
					{#if errors.get($emailInput.name)}
						<p class="text-xs text-red-400 !my-1">{explanations[errors.get($emailInput.name)]}</p>
					{/if}
				</div>
				<div class="mb-3">
					<label for="password" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Password</label>
					<input bind:value={$password.value} type="password" id="password" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none placeholder:text-2xl" placeholder=".........." required />
					{#if errors.get($password.name)}
						<p class="text-xs text-red-400 !my-1">{explanations[errors.get($password.name)]}</p>
					{/if}
				</div>
			</div>
			<div class="flex justify-between md:px-5 mt-1 mb-4 items-center">
				<span class="flex items-center">
					<input type="checkbox" id="remember" class="rounded outline-none" />
					<label for="remember" class="p-1 text-sm">Remember me</label>
				</span>
				<a href="/auth/forgot " class="no-underline text-primary text-sm"> Forgot Password? </a>
			</div>
			<div class="flex justify-center">
				{#if !signinState}
					<button
						disabled={!$signin.valid}
						on:keydown={() => {}}
						on:click={async () => {
							await signin.validate();
							if ($signin.valid) {
								signinUser();
							}
							console.log($signin.valid, $signin);
						}}
						class="button w-full max-w-sm"
						style="color:white !important">Sign into your account</button
					>
				{:else}
					<button class="button w-full max-w-sm !bg-neutral-700" style="color:white !important">....</button>
				{/if}
			</div>
			{#if errorState}
				<div class="flex justify-center">
					<p class="text-xs !text-red-500 font-semibold !my-1">{errorMessage}</p>
				</div>
			{/if}
		</div>
	</section>
</article>
