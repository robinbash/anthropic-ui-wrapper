import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FIREBASE_SERVICE_ACCOUNT } from '$env/static/private';
import { dev } from '$app/environment';

const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT || '{}');

if (!getApps().length) {
	if (dev) {
		initializeApp({
			projectId: serviceAccount.project_id
		});
	} else {
		initializeApp({
			credential: cert(serviceAccount)
		});
	}
}

export const adminAuth = getAuth();
