<script lang="ts">
	import { onMount } from 'svelte';
	import { Sidebar, Login } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/stores/auth';
	import { onAuthStateChanged } from 'firebase/auth';

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user.set(currentUser);
		});
		return unsubscribe;
	});
</script>

<div class="app">
	{#if $user === undefined}
		<div class="loading-screen">
			<span class="loader" />
		</div>
	{:else if $user === null}
		<Login />
	{:else}
		<Sidebar />
		<main>
			<slot />
		</main>
	{/if}
</div>

<style>
	:global(body) {
		background-color: black;
		margin: 0;
		color: white;
		font-family: Lato, Geneva, Tahoma, sans-serif;
	}
	.app {
		display: flex;
		flex-direction: row;
		height: 100vh;
		width: 100vw;
	}
	main {
		width: 100%;
		display: flex;
	}
	.loading-screen {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loader {
		width: 48px;
		height: 48px;
		border: 5px solid #fff;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
