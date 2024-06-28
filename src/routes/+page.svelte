<script lang="ts">
	import { Sidebar, Convo } from '$lib/components';
</script>

<div class="app">
	<Sidebar />
	<main>
		<Convo />
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
