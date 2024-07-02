<script lang="ts">
	import { login } from '$lib/auth';
	let email = '';
	let password = '';
</script>

<div class="Login">
	<input bind:value={email} type="email" placeholder="Email" />
	<input bind:value={password} type="password" placeholder="Password" />
	<button on:click={() => login(email, password)}>Login</button>
</div>

<style>
	.Login {
		gap: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}
	button {
		background-color: white;
		color: black;
		padding: 1rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}
</style>
