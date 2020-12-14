import firebase from 'firebase';

interface IConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;

}
const firebaseConfig: IConfig = {
  apiKey: 'AIzaSyC06XupSOP2BA31HafJfUzgeP8qAQZz_h4',
  authDomain: 'blipper-demo.firebaseapp.com',
  projectId: 'blipper-demo',
  storageBucket: 'blipper-demo.appspot.com',
  messagingSenderId: '591184736186',
  appId: '1:591184736186:web:92e0dfb2bb3c51c23bb783',
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const fire = firebase;

export default fire;
