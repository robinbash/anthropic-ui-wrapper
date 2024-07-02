<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { convos } from '$lib/stores';
	import { Sidebar, Login } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/stores/auth';
	import { onAuthStateChanged } from 'firebase/auth';

	onMount(() => {
		convos.init();
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			user.set(currentUser);
		});
		return unsubscribe;
	});

	onDestroy(() => {
		convos.destroy();
	});
</script>

<div class="app">
	{#if $user}
		<Sidebar />
		<main>
			<slot />
		</main>
	{:else}
		<Login />
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
</style>
