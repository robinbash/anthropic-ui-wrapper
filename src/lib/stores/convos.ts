import { writable } from 'svelte/store';
import type { Conversation } from '$lib/types';
import { collection, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { goto } from '$app/navigation';

const CONVO_COLLECTION = 'conversations';

function createConvoStore() {
	const { subscribe, set } = writable<Conversation[]>([]);

	let unsubscribe: () => void;

	const saveConversation = async (conversation: Conversation) => {
		if (!conversation.id) {
			const { id } = await addDoc(collection(db, CONVO_COLLECTION), {
				messages: conversation.messages
			});
			goto(id);
			return;
		}
		updateDoc(doc(db, CONVO_COLLECTION, conversation.id), { messages: conversation.messages });
	};

	return {
		subscribe,
		saveConversation,
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

export const convos = createConvoStore();
