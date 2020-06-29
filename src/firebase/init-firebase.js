// Firebase
import firebase from 'firebase';
import { Firebase } from '../credentials';

// Config firebase
const config = {
  apiKey: `${Firebase}`,
  authDomain: 'web-weather-station-ac73f.firebaseapp.com',
};

firebase.initializeApp(config)