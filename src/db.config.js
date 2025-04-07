import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ⚠️ Thêm dòng này

const firebaseConfig = {
  apiKey: "AIzaSyAule8hX8KOdQ9MO-HR7bsJ_oqNjL1UBJo",
  authDomain: "movies-fce02.firebaseapp.com",
  projectId: "movies-fce02",
  storageBucket: "movies-fce02.appspot.com",
  messagingSenderId: "61800819767",
  appId: "1:61800819767:web:2f07df89896dd5ece063b2",
  measurementId: "G-RXLMJW32QF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ⚠️ Bổ sung dòng này

export { db, auth }; // ⚠️ Xuất auth để sử dụng ở nơi khác
