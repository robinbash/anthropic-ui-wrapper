import { writable } from 'svelte/store';
import type { Conversation } from '$lib/types';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '$lib/firebase';

const CONVO_COLLECTION = 'conversations';

function createConvoStore() {
	const { subscribe, set } = writable<Conversation[]>([]);

	let unsubscribe: () => void;

	return {
		subscribe,
		init: () => {
			const colRef = collection(db, CONVO_COLLECTION);
			unsubscribe = onSnapshot(colRef, (snapshot) => {
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}));
				set(data as Conversation[]);
			});
		},
		destroy: () => {
			if (unsubscribe) {
				unsubscribe();
			}
		}
	};
}

export const convoStore = createConvoStore();
