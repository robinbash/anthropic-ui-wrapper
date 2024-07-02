import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const login = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
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
