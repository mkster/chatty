import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyB4Dya7IPHlOmuuXNC5cdZo89PGjIg-p_c",
    authDomain: "chatty-22c29.firebaseapp.com",
    databaseURL: "https://chatty-22c29.firebaseio.com",
    projectId: "chatty-22c29",
    storageBucket: "chatty-22c29.appspot.com",
    messagingSenderId: "686712331939",
    appId: "1:686712331939:web:9ec3c816fdcca4894e6916",
    measurementId: "G-Q2G01LFRP0"
};

firebase.initializeApp(config);
firebase.analytics();
export const auth = firebase.auth;
export const db = firebase.database()
export const store = firebase.firestore()


//firebase helper
export function dbGetFirstChild(snapshot) {
    let first = null;
    snapshot.forEach(
        (v) => { first = first || v.val(); }
    );
    return first;
}

export function dbGetLastChild(snapshot) {
    let last = null;
    snapshot.forEach(
        (v) => { last = v.val(); }
    );
    return last;
}
