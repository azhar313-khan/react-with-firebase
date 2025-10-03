import { createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        return uid;
      } else {
      }
    });
  } catch (error) {
    console.error(error);
  }
});
