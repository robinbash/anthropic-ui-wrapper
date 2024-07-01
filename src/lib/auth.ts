import { auth } from './firebase';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

export const login = async () => {
	const provider = new GoogleAuthProvider();
	try {
		await signInWithPopup(auth, provider);
	} catch (error) {
		console.error('Error logging in:', error);
	}
};

export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Error logging out:', error);
	}
};
