<script>
	import { onMount, onDestroy } from 'svelte';
	import { convoStore } from '$lib/stores';

	onMount(() => {
		convoStore.init();
	});

	onDestroy(() => {
		convoStore.destroy();
	});
</script>

<slot />
