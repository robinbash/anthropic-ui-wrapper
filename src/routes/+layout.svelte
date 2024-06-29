<script>
	import { onMount, onDestroy } from 'svelte';
	import { convoStore } from '$lib/stores';
	import { Sidebar } from '$lib/components';

	onMount(() => {
		convoStore.init();
	});

	onDestroy(() => {
		convoStore.destroy();
	});
</script>

<div class="app">
	<Sidebar />
	<main>
		<slot />
	</main>
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
