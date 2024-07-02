<script lang="ts">
	import { onDestroy } from 'svelte';
	import { convoStore } from '$lib/stores';
	import type { Message } from '$lib/types';
	import SvelteMarkdown from 'svelte-markdown';
	import { authFetch } from '$lib/fetch';

	export let convoId: string | undefined = undefined;

	// let messages = [];
	let inputEl: HTMLDivElement;
	let generating = false;
	let eventSource: EventSource;
	let messages: Message[];

	$: messages = $convoStore.find((convo) => convo.id === convoId)?.messages ?? [];

	async function submitMessage() {
		const message = inputEl.innerText;
		if (!message || generating) return;
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
						convoStore.saveConversation({ messages, id: convoId });
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
				<div class="assistant-message"><SvelteMarkdown source={message.content} /></div>
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
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.messages {
		padding: 3rem;
		height: 100%;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.user-message {
		width: 100%;
		display: flex;
		justify-content: right;
	}
	.user-inner {
		border-radius: 1rem;
		background-color: gray;
		width: 70%;
		text-align: justify;
		padding: 0.5rem 1rem;
	}
	.assistant-message {
		text-align: justify;
	}
	.bottom {
		display: flex;
		justify-content: center;
		align-items: end;
		padding: 1rem 0 3rem;
		gap: 0.5rem;
	}
	.input {
		width: 25rem;
		/* height: 1rem; */
		border-radius: 1rem;
		background-color: gray;
		padding: 0.5rem 1rem;
	}
	.input:focus {
		outline: none;
	}
	button {
		width: 3rem;
		height: 2.5rem;
		border-radius: 1rem;
		font-weight: bold;
		background-color: gray;
	}
</style>
