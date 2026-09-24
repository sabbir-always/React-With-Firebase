import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAviPbkp0uoWJJuqVYjO9NOsXYwIAYTjOE",
  authDomain: "auth-test-c5999.firebaseapp.com",
  projectId: "auth-test-c5999",
  storageBucket: "auth-test-c5999.firebasestorage.app",
  messagingSenderId: "708764833875",
  appId: "1:708764833875:web:e5ea917aa4be7b24170ea6",
  measurementId: "G-09VLHK82FY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);