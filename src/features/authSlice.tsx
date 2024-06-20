import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loginUserService, signUserService } from "../service/authService";
import { MyState, RejectValue, SignUpUserPayload } from "../interface";

const initialState: MyState = {
  isLoggedIn: false,
  user: null,
  users: [],
  error: null,
  isLodding: false,
};

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await auth.signOut();
        return user;
      } else {
        return user;
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
>("auth/signUpUser", async ({ email, password, name }) => {
  const result = await signUserService({ email, password, name });
  return result;
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: any) => {
    const result = await loginUserService(data);
    return result;
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
        if (action.payload.accessToken) {
          state.isLoggedIn = true;
        }
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
