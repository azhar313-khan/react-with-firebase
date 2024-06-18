import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { auth, db } from "../firebase/firebase";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const initialState: MyState = {
  isLoggedIn: false,
  user: null,
  users: [],
  error: null,
  isLodding: false,
};

interface MyState {
  user: null;
  users: [];
  isLodding: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

interface SignUpUserPayload {
  email: string;
  password: string;
  name: string;
}

interface LoginUserPayload {
  id: string;
  email: string;
  password: string;
}

interface RejectValue {
  message: string;
}

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User", user);
        return user;
      } else {
        return "auth";
      }
    });
  } catch (error) {
    console.error(error);
  }
});

export const signUpUser = createAsyncThunk<
  unknown,
  SignUpUserPayload,
  {
    rejectValue: RejectValue;
  }
>("auth/signUpUser", async ({ email, password, name }, { rejectWithValue }) => {
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

    console.log(docRef, "docsSnap");

    return user;
  } catch (error: any) {
    const errorMessage = error.message.split("/")[1].split("-").join(" ");
    return rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: any, { rejectWithValue }) => {
    const { email, password }: LoginUserPayload = data;
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
          console.log(doc.id, " => ", doc.data());
          userData = doc.data();
          userData.userId = doc.id;
        });

        enqueueSnackbar("Login Successfully", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 1000,
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
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isLodding = false;
        state.user = null;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLodding = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.isLoggedIn = true;
        state.user = action.payload ?? null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLodding = true;
        state.isLoggedIn = false;
        state.error =
          typeof action.payload === "string" ? action.payload : null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
