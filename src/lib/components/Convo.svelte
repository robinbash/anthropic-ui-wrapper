<script lang="ts">
	import { onDestroy } from 'svelte';
	import { convos } from '$lib/stores';
	import type { Message } from '$lib/types';
	import SvelteMarkdown from 'svelte-markdown';
	import { authFetch } from '$lib/fetch';
	import { user } from '$lib/stores';
	import CodeRenderer from './CodeRenderer.svelte';

	export let convoId: string | undefined = undefined;

	let inputEl: HTMLDivElement;
	let generating = false;
	let eventSource: EventSource;
	let messages: Message[];

	$: messages = $convos.find((convo) => convo.id === convoId)?.messages ?? [];

	async function submitMessage() {
		const message = inputEl.innerText;
		if (!message || generating || !$user) return;
		inputEl.innerHTML = '';
		messages = [...messages, { role: 'user', content: message }];
		generating = true;

		try {
			if (eventSource) {
				eventSource.close();
			}
			const response = await authFetch('/api/message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ messages })
			});
			if (response.ok) {
				const reader = response.body?.getReader();
				if (!reader) {
					throw new Error('Failed to get reader from response');
				}
				const previousMessages = [...messages];
				let answer = '';
				const decoder = new TextDecoder();
				while (true) {
					const { done, value } = await reader?.read();
					if (done) {
						convos.saveConversation({ messages, id: convoId, userId: $user.uid });
						break;
					}
					const chunk = decoder.decode(value);
					answer = answer + chunk;
					messages = [...previousMessages, { role: 'assistant', content: answer }];
				}
			}
		} finally {
			generating = false;
		}
	}

	onDestroy(() => {
		if (eventSource) {
			eventSource.close();
		}
	});
</script>

<div class="convo">
	<div class="messages">
		{#each messages as message}
			{#if message.role === 'user'}
				<div class="user-message">
					<span class="user-inner">{message.content}</span>
				</div>
			{:else}
				<div class="assistant-message">
					<SvelteMarkdown source={message.content} renderers={{ code: CodeRenderer }} />
				</div>
			{/if}
		{/each}
	</div>
	<div class="bottom">
		<div class="input" contentEditable bind:this={inputEl} />
		<div>
			<button on:click={submitMessage}>{'>'}</button>
		</div>
	</div>
</div>

<style>
	.convo {
		@apply w-full flex flex-col;
	}
	.messages {
		@apply flex flex-col p-8 md:p-12 h-full overflow-y-scroll gap-8;
	}
	.user-message {
		@apply w-full flex justify-end;
	}
	.user-inner {
		@apply rounded-full bg-zinc-700 py-2 px-4 text-justify w-5/6 md:w-2/3;
	}
	.assistant-message {
		@apply text-justify;
	}
	.bottom {
		@apply flex justify-center items-end gap-2 pb-12 pt-4 px-8;
	}
	.input {
		@apply w-full rounded-full bg-zinc-700 py-2 px-4 max-w-96;
	}
	.input:focus {
		@apply outline-none;
	}
	button {
		@apply rounded-full bg-zinc-700 text-white w-12 h-10 font-bold;
	}
	:global(.assistant-message > *) {
		all: revert;
	}
</style>
