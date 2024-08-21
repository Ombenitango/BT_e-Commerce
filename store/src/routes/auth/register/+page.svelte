<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import { form, field } from "svelte-forms";
	import { required, email, min, pattern } from "svelte-forms/validators";

	import { auth, db } from "../../../js/firebase";
	import { user } from "../../../js/store";

	import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
	import { collection, addDoc, serverTimestamp } from "firebase/firestore";

	function equivalent() {
		return () => ({ valid: $password.value == $confirmPassword.value && $confirmPassword.value && $confirmPassword.value != " ", name: "passwords_not_match" });
	}
	function checked() {
		return () => ({ valid: $agreement.value == true, name: "not checked" });
	}

	const continueUrl = $page.url.searchParams.get("continueUrl");

	let firstName = field("firstName", null, [required(), min(2)], {
		validateOnChange: true,
	});
	let lastName = field("lastName", null, [required(), min(2)], {
		validateOnChange: true,
	});
	let emailInput = field("email", null, [required(), email()], { validateOnChange: true });
	let password = field("password", "", [required(), pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)], { validateOnChange: true });
	let confirmPassword = field("confirmPassword", null, [required(), equivalent()], { validateOnChange: true });
	let username = field("username", "", [required(), min(2)], { validateOnChange: true });
	let agreement = field("agree", false, [checked()], {
		validateOnChange: true,
	});
	let register = form(firstName, lastName, username, password, confirmPassword, emailInput);
	const explanations = {
		not_an_email: `It is not a valid email address`,
		pattern: `password must have least one lowercase letter, one uppercase letter, one digit, and one special character`,
		min: "Value is too short",
		passwords_not_match: "passwords do not match",
	};
	let passwordValid = true;
	let names = [];
	let errors = new Map();

	let state = "Create account";

	let created = false;

	names = Object.keys($register.summary);

	function prune(error, name) {
		let regex = new RegExp(name + "\\.", "g");
		if (error.match(regex)?.[0]) {
			return [name, error.replace(regex, "")];
		} else {
			return null;
		}
	}

	let actionCodeSettings = {
		url: `http://${$page.url.host}${continueUrl}`,
	};
	async function createUser() {
		state = "creating...";
		let localUser;
		await createUserWithEmailAndPassword(auth, $emailInput.value, $password.value)
			.then(async (userCredential) => {
				$user = userCredential.user;
				localUser = userCredential.user;
				await sendEmailVerification($user, actionCodeSettings);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
		await updateProfile(localUser, { displayName: $username.value });
		let userData = {
			username: $username.value,
			email: $emailInput.value,
			uid: localUser.uid,
			role: "user",
			name: {
				firstName: $firstName.value,
				lastName: $lastName.value,
			},
			createdOn: serverTimestamp(),
		};
		await addDoc(collection(db, "users"), userData);
		created = true;
	}

	// $:{console.log($agreement.value);}

	$: {
		if (password && confirmPassword && password != confirmPassword) {
			passwordValid = false;
		} else {
			passwordValid = true;
		}
		if (!$register.valid) {
		}
	}

	$: {
		if ($register.errors.length > 0) {
			errors = new Map();
			for (let error of $register.errors) {
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

	// onMount(()=>{
	//     const
	// })
</script>

<article class="prose lg:prose-xl max-w-none w-full h-full flex-1 flex justify-center items-center flex-wrap">
	{#if !created}
		<section class="flex flex-1 justify-center">
			<div class="card w-full xs:max-w-md mx-2 !rounded-xl md:max-w-lg p-6 child:!text-neutral-700 child:dark:!text-white !my-5">
				<h2 class="!mt-1 !mb-4">Create an Account</h2>
				<div class="flex flex-wrap justify-between child:!text-neutral-700 dark:child:!text-neutral-400 !mt-2">
					<span class="flex items-center xs border-solid border-[1px] border-current px-5 py-0 rounded-md">
						<svg class="w-10 h-10" width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M120 76.1C120 73 119.7 69.8 119.2 66.8H75.9V84.5H100.7C99.7 90.2 96.4 95.2 91.5 98.4L106.3 109.9C115 101.8 120 90 120 76.1Z" fill="#4280EF" /><path d="M75.9 120.9C88.3 120.9 98.7 116.8 106.3 109.8L91.5 98.4C87.4 101.2 82.1 102.8 75.9 102.8C63.9 102.8 53.8 94.7 50.1 83.9L34.9 95.6C42.7 111.1 58.5 120.9 75.9 120.9Z" fill="#34A353" /><path d="M50.1 83.8C48.2 78.1 48.2 71.9 50.1 66.2L34.9 54.4C28.4 67.4 28.4 82.7 34.9 95.6L50.1 83.8Z" fill="#F6B704" /><path d="M75.9 47.3C82.4 47.2 88.8 49.7 93.5 54.2L106.6 41C98.3 33.2 87.3 29 75.9 29.1C58.5 29.1 42.7 38.9 34.9 54.4L50.1 66.2C53.8 55.3 63.9 47.3 75.9 47.3Z" fill="#E54335" /></svg>
						<p class="hidden sm:block ml-1 max-w-[12ch] whitespace-nowrap overflow-hidden text-ellipsis text-xs md:max-w-none md:whitespace-normal font-semibold !my-0">Sign up with Google</p>
						<!-- <p class="hidden sm:block ml-1 text-xs md:text-base font-semibold !my-0">Sign up with Google</p> -->
					</span>
					<span class="flex items-center border-solid border-[1px] border-current px-5 py-0 rounded-md">
						<svg class="w-10 h-10 fill-[#3B5998]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path></svg>
						<p class="hidden sm:block ml-1 max-w-[12ch] whitespace-nowrap overflow-hidden text-ellipsis text-xs md:max-w-none md:whitespace-normal font-semibold !my-0">Sign up with Facebook</p>
						<!-- <p class="hidden sm:block ml-1 text-xs md:text-base font-semibold !my-0">Sign up with Apple</p> -->
					</span>
				</div>
				<div class="flex items-center !my-5">
					<div class="line mr-4"></div>
					<p class="text-base font-semibold !p-0 !my-0">or</p>
					<div class="line ml-4"></div>
				</div>
				<div class="flex flex-col">
					<div class="flex flex-wrap items-start">
						<div class="mb-4 flex-1 mr-1 relative">
							<label for="first" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">First name</label>
							<input bind:value={$firstName.value} type="text" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="First name" required />
							{#if errors.get($firstName.name)}
								<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($firstName.name)]}</p>
							{/if}
						</div>
						<div class="mb-3 flex-1 ml-1 relative">
							<label for="last" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Last name</label>
							<input bind:value={$lastName.value} type="text" id="last" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Last name" required />
							{#if errors.get($lastName.name)}
								<p class="text-xs text-red-400 absolute top-[80%]">{explanations[errors.get($lastName.name)]}</p>
							{/if}
						</div>
					</div>
					<div class="mt-1 mb-3">
						<label for="user" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Username</label>
						<input bind:value={$username.value} type="text" id="user" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Enter your username" required />
						{#if errors.get($username.name)}
							<p class="text-xs text-red-400 !my-1">{explanations[errors.get($username.name)]}</p>
						{/if}
					</div>
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
					<div class="mb-3">
						<label for="confirmPassword" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Confirm password</label>
						<input bind:value={$confirmPassword.value} type="password" id="confirmPassword" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none placeholder:text-2xl" placeholder=".........." required />
						{#if errors.get($confirmPassword.name)}
							<p class="text-xs text-red-400 !my-1">{explanations[errors.get($confirmPassword.name)]}</p>
						{/if}
					</div>
				</div>
				<div class="flex justify-between mt-1 mb-4 items-start">
					<input bind:checked={$agreement.value} type="checkbox" id="terms" class="rounded outline-none mt-1 bg-neutral-800" />
					<p class="text-xs ml-2 !my-0 !p-0">By signing up, you are creating a account, and you agree to IdrisElectro's <a href="/auth/signup" class="text-primary no-underline">Terms of Use</a> and <a href="/auth/signup" class="text-primary no-underline">Privacy Policy.</a></p>
				</div>
				<div class="flex justify-center">
					<button
						disabled={!$register.valid}
						on:keydown={() => {}}
						on:click={() => {
							register.validate();
							if ($register.valid) {
								createUser();
							}
							console.log($register.valid, $register);
						}}
						class="button w-full max-w-sm disabled:!bg-neutral-700 !shadow"
						style="color:white !important">{state}</button
					>
				</div>
				<p class="!my-2 text-base !mb-4">Already have an account? <a href={`/auth?continueUrl=${continueUrl}`} class="text-primary">Sign in here.</a></p>
			</div>
		</section>
	{:else}
		<section class="prose card p-5 grid place-content-center child:!text-neutral-700 child:dark:!text-neutral-50">
			<h3>Hi there! Please check your email inbox to verify your email address. Thank you!</h3>
		</section>
	{/if}
</article>
