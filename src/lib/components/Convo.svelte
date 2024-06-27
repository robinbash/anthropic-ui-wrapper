<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	// import { convoStore } from '$lib/stores';
	import { get } from 'svelte/store';
	import { load } from '$lib/firebase';

	let convoId: string;
	// const conversation = $convoStore.find((convo) => convo.id === convoId);

	let text = '';
	let inputEl: HTMLDivElement;
	let eventSource: EventSource;

	onMount(() => {
		load();
	});

	async function submitMessage() {
		const message = inputEl.innerText;
		console.log(message);
		if (!message) return;
		if (eventSource) {
			eventSource.close();
		}

		const response = await fetch('/api/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message })
		});

		if (response.ok) {
			const reader = response.body?.getReader();
			if (!reader) {
				throw new Error('Failed to get reader from response');
			}
			const decoder = new TextDecoder();
			while (true) {
				const { done, value } = await reader?.read();
				if (done) {
					console.log('done');
					break;
				}
				const chunk = decoder.decode(value);
				console.log(chunk);
				text = text + chunk;
			}
		} else {
			console.error('Failed to start stream');
		}
	}

	onDestroy(() => {
		if (eventSource) {
			eventSource.close();
		}
	});

	// const submitMessage = () => {
	//   const message = inputEl.innerText
	//   console.log(message)
	//   if (!message) return

	//   eventSource = new EventSource('/api/stream', );
	//   eventSource.onmessage = (event) => {
	//     messages = [...messages, event.data];
	//   };

	//   eventSource.onerror = (error) => {
	//     console.error('EventSource failed:', error);
	//     eventSource.close();
	//   };
	// }
</script>

<div class="convo">
	<div class="messages">{text}</div>
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
	}
	.bottom {
		display: flex;
		justify-content: center;
		align-items: end;
		padding: 3rem;
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
