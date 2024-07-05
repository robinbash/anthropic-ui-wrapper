<script>
	import { convos, user } from '$lib/stores';
	import { Logout } from '$lib/components';
	import { onMount, onDestroy } from 'svelte';
	let isOpen = false;

	function toggleSidebar() {
		isOpen = !isOpen;
	}

	const close = () => {
		isOpen = false;
	};

	onMount(() => {
		if (!$user) return;
		convos.init($user.uid);
	});

	onDestroy(() => {
		convos.destroy();
	});
</script>

<div class="container">
	<button
		class="burger"
		class:left-4={!isOpen}
		class:right-4={isOpen}
		on:click={toggleSidebar}
		aria-label="Toggle sidebar"
	>
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			></path>
		</svg>
	</button>

	<aside class="items" class:items-closed={!isOpen}>
		<nav class="p-6">
			<ul class="space-y-2">
				<li class="flex">
					<a class="w-full" on:click={close} href="/">+ Add</a>
				</li>
				{#each $convos as conversation}
					<li class="flex">
						<a class="convo-item" on:click={close} href={`${conversation.id}`}
							>{conversation.messages[0].content.slice(0, 50)}</a
						>
					</li>{/each}
			</ul>
		</nav>
		<div class="logout">
			<Logout />
		</div>
		<div class="pad-right" />
	</aside>

	<main class="flex w-full">
		<slot />
	</main>
</div>

<style>
	.container {
		@apply flex relative min-h-screen w-full;
	}
	.burger {
		@apply fixed top-4 z-20 md:hidden;
	}
	.items {
		@apply fixed top-0 left-0 z-10 h-full w-64 bg-zinc-900 text-white translate-x-0;
		@apply md:relative w-full md:w-80;
	}
	.items-closed {
		@apply -translate-x-full md:translate-x-0 hidden md:block;
	}
	.convo-item {
		@apply w-full whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer p-2;
	}
	.pad-right {
		@apply fixed top-0 right-0 w-12 bg-black h-full;
	}
	.logout {
		@apply fixed bottom-0 left-0 p-6 bg-zinc-900 text-white;
	}
</style>
