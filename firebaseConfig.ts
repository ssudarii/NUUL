//firebaseConfig.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9nnyp1G1eq64Av1Mo330iLG-mBV3bTAU',
  authDomain: 'app-nuul.firebaseapp.com',
  projectId: 'app-nuul',
  storageBucket: 'app-nuul.appspot.com',
  messagingSenderId: '157236263551',
  appId: '1:157236263551:android:f6cb9a54356abf61009d4a',
};

const db = firestore();

export { auth, firestore, db };
