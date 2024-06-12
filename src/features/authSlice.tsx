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
  // Define your state properties
  user: null;
  users: [];
  isLodding: boolean;
  isLoggedIn: boolean;
  error: string | null; // Ensure error property can hold strings or null
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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        return user;

        // ...
      } else {
        return "auth";
        // User is signed out
        // ...
      }
    });
  } catch (error) {
    console.error(error);
  }
});

export const signUpUser = createAsyncThunk<
  unknown, // Return type of the thunk
  SignUpUserPayload, // First argument type of the payload creator
  {
    rejectValue: RejectValue; // The type for rejectWithValue
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error.message.split("/")[1].split("-").join(" ");
    return rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// const checkCredentials = (user: User, credentials: cred) => {
//   return (
//     user.email === credentials.email && user.password === credentials.password
//   );
// };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // signup: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = action.payload;
    //   state.users.push(action.payload);
    // },
    // login: (state, action) => {
    //   const storedUser = state.users.find(
    //     (user) => user.email === action.payload.email
    //   );

    //   console.log(storedUser, "check user");
    //   if (!storedUser) {
    //     state.isLoggedIn = false;
    //     enqueueSnackbar("User Not Found ", {
    //       variant: "error",
    //       anchorOrigin: { vertical: "top", horizontal: "center" },
    //       autoHideDuration: 1000,
    //     });
    //     return;
    //   }
    //   const isMatch = checkCredentials(storedUser, action.payload);
    //   if (isMatch) {
    //     state.isLoggedIn = true;
    //     state.user = storedUser;
    //     enqueueSnackbar("Login Successfully ", {
    //       variant: "success",
    //       anchorOrigin: { vertical: "top", horizontal: "center" },
    //       autoHideDuration: 1000,
    //     });
    //   } else {
    //     enqueueSnackbar("Invalid Credentials", {
    //       variant: "error",
    //       anchorOrigin: { vertical: "top", horizontal: "center" },
    //       autoHideDuration: 1000,
    //     });
    //   }
    // },
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
        state.error = typeof action.payload === "string" ? action.payload : null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
