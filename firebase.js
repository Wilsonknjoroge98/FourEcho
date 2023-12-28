import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyDJMAFnpTyjvl2KUit104uEgbvYadXTd70',
  authDomain: 'publichealthapp-5964a.firebaseapp.com',
  databaseURL: 'https://publichealthapp-5964a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'publichealthapp-5964a',
  storageBucket: 'publichealthapp-5964a.appspot.com',
  messagingSenderId: '322791136816',
  appId: '1:322791136816:web:bd402bd7546c8e604f17f5',
  measurementId: 'G-RFG2FG8DDE',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
