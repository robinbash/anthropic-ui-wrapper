<script lang="ts">
	import { convos, user } from '$lib/stores';
	import { Logout } from '$lib/components';
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		if (!$user) return;
		convos.init($user.uid);
	});

	onDestroy(() => {
		convos.destroy();
	});
</script>

<div class="sidebar">
	<div class="convolist">
		<div class="buttondiv">
			<a href="/">New</a>
		</div>
		{#each $convos as conversation}
			<a class="convoitem" href={`${conversation.id}`}
				>{conversation.messages[0].content.slice(0, 30)}</a
			>{/each}
	</div>
	<Logout />
</div>

<style>
	.sidebar {
		border-right: 1px solid;
		border-color: gray;
		height: 100%;
		width: 13rem;
	}
	.convolist {
		display: grid;
		justify-content: center;
		padding-top: 2rem;
	}
	.convoitem {
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;
		padding: 0.5rem 1rem;
	}
	.convoitem:hover {
		background-color: gray;
	}
	.buttondiv {
		display: flex;
		justify-content: center;
	}
</style>
