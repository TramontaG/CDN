import admin from 'firebase-admin';

export const firebase = admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});

export * from './fileManager';
