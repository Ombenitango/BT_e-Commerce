<script>
	import { form, field } from "svelte-forms";
	import { required, email } from "svelte-forms/validators";
	import { auth } from "../../../js/firebase";
	import { sendPasswordResetEmail } from "firebase/auth";
	let emailInput = field("email", null, [required(), email()], { validateOnChange: true });
	let forgot = form(emailInput);

	let errorMessage = null;

	let state = "form";
</script>

<article class="prose lg:prose-xl prose-neutral dark:prose-invert max-w-none w-full h-full flex-1 flex justify-center items-center flex-wrap">
	<section class="flex flex-1 justify-center my-5">
		<div class="card w-full xs:max-w-sm mx-2 !rounded-xl md:max-w-lg p-6">
			{#if state == "form"}
				<h2 class="!my-1">Reset password</h2>
				<label for="email" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white mt-4">Email address</label>
				<input bind:value={$emailInput.value} type="email" id="email" class="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" placeholder="Enter your email" required />
				{#if $forgot.errors.length > 0}
					<p class="text-xs text-red-400 !my-1">Invalid Email</p>
				{/if}
				<div class="flex justify-end pt-3">
					<button
						class="button"
						on:click={() => {
							state = "loading";
							sendPasswordResetEmail(auth, $emailInput.value)
                            .then((result) => {
								state = "done";
							})
                            .catch(error=>{
                                state="form"
                                errorMessage=error.message
                            })
						}}>Reset password</button
					>
				</div>
				{#if errorMessage}
					<div class="flex justify-center">
						<p class="text-sm !text-red-500 !my-1">{errorMessage}</p>
					</div>
				{/if}
			{:else if state == "loading"}
				<div class="flex justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-neutral-700 dark:stroke-white" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
						<path fill="none" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(1);transform-origin:50px 50px">
							<animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
						</path>
					</svg>
				</div>
			{:else}
				<div class="flex flex-col items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-462 140-685v465h390v60H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v310h-60v-255L480-462Zm0-60 340-218H140l340 218ZM774-44l-42-42 73-74H590v-60h215l-74-74 43-42 146 146L774-44ZM140-685v499-244 4-314 55Z" /></svg>
					<h5>Check your email</h5>
				</div>
			{/if}
		</div>
	</section>
</article>
