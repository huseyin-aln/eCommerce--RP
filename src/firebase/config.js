import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  // updateProfile,
} from "firebase/auth";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../redux/slice/authSlice";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const createUser = async (email, password, cPassword, navigate) => {
  try {
    if (password !== cPassword) {
      toastErrorNotify("Passwords do not match.");
    }
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // await updateProfile(auth.currentUser, {
    //   displayName: displayName,
    // });
    toastSuccessNotify("Registered successfully!");
    navigate("/");
    console.log(userCredential);
  } catch (err) {
    toastErrorNotify(err.message);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
    // sessionStorage.setItem('user', JSON.stringify(userCredential.user));
    console.log(userCredential);
  } catch (err) {
    toastErrorNotify(err.message);
    console.log(err);
  }
};

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      toastErrorNotify(error.message);
    });
};

export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toastWarnNotify("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
    });
};

export const logoutUser = (navigate) => {
  signOut(auth)
    .then(() => {
      toastSuccessNotify("Logout succesfully...");
      navigate("/");
    })
    .catch((error) => {
      toastErrorNotify(error.message);
    });
};

export const userObserver = (displayName, setDisplayName, dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);

      if (user.displayName == null) {
        const emailName = user.email.substring(0, user.email.indexOf("@"));
        const userEmailName =
          emailName.charAt(0).toUpperCase() + emailName.slice(1);

        setDisplayName(userEmailName);
      } else {
        setDisplayName(user.displayName);
      }

      dispatch(
        SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,
        })
      );
    } else {
      setDisplayName("");
      dispatch(REMOVE_ACTIVE_USER());
    }
  });
};

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
