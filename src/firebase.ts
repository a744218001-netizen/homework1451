import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDocFromServer } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your custom Web App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Gew4ZcH0o5eI5v-iTckQeUD5_z60IN8",
  authDomain: "homework-5b2a7.firebaseapp.com",
  projectId: "homework-5b2a7",
  storageBucket: "homework-5b2a7.firebasestorage.app",
  messagingSenderId: "358848168685",
  appId: "1:358848168685:web:69cd1c28664d9297b1c2e4",
  measurementId: "G-FDTX3XJ0NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Operational and logging enum for debug
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

// Global firestore error handling custom wrapper
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection on startup
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network status.", error);
    }
  }
}
testConnection();
