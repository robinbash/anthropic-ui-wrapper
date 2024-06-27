import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	doc,
	updateDoc,
	query,
	connectFirestoreEmulator,
	where
} from 'firebase/firestore';

// import { v4 as uuid } from 'uuid';

import { dev } from '$app/environment';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logOut = () => signOut(auth);

export const db = getFirestore();

if (dev) {
	connectFirestoreEmulator(db, 'localhost', 8080);
}

export const load = async () => {
	const snapshot = getDocs(collection(db, 'yourCollection'));
	const data = (await snapshot).docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	console.log(data);

	return {
		data
	};
};

// export const submitReceipt = async (imageBase64: string) => {
// 	const id = uuid();
// 	try {
// 		let submission = {
// 			imageBase64,
// 			id
// 		};
// 		const {} = await addDoc(collection(db, RECEIPTS_COLLECTION), submission);
// 	} catch (e) {
// 		console.error('Error adding document: ', e);
// 	}
// };
