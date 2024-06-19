
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';
import { LoginUserPayload, SignUpUserPayload } from "../interface";
import { SnackbarMessages } from "../assets/constantText";




export const signUserService = async({ email, password, name }:SignUpUserPayload) => {
    try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const docRef = await addDoc(collection(db, "users"), {
      email: email,
      password: password,
      name: name,
      authId: user.uid,
    });


    return user;
  } catch (error: any) {
    const errorMessage = error.message.split("/")[1].split("-").join(" ");
    return (errorMessage);
  }
}

export const loginUserService = async({email,password}:LoginUserPayload) => {
     try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const q = query(
          collection(db, "users"),
          where("email", "==", userCredential.user.email)
        );
        const querySnapshot = await getDocs(q);
        let userData = null;
        querySnapshot.forEach((doc) => {
          userData = doc.data();
          userData.userId = doc.id;
        });

        enqueueSnackbar(SnackbarMessages.LOGIN_SUCCESS, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: SnackbarMessages.AUTO_HIDE_DURATION,
        });

        return userData;
      }
    } catch (error: any) {
      const errorMessage = error.message.split("/")[1].split("-").join(" ");
      enqueueSnackbar(errorMessage, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 1000,
      });
      return (errorMessage);
    }
}