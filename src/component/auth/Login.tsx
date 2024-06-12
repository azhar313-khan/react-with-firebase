import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import "../Add.css";
import { useEffect } from "react";
import type { AppDispatch } from "../../store/store";

interface isloginInterface {
  authStore: {
    isLoggedIn: boolean;
  };
}

interface AuthStore {
  id: string;
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(
    (state: isloginInterface) => state?.authStore?.isLoggedIn
  );

  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required").min(6),
    }),
    onSubmit: async (values: AuthStore) => {
      // dispatch(loginUser(values));
      // if (isLoggedIn) navigate("/");
      const result = dispatch(loginUser(values));

      if (loginUser.fulfilled.match(result)) {
        navigate("/");
      }
    },
  });

  const goToSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [navigate, isLoggedIn]);

  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ textAlign: "center" }}>Login Page</h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{ margin: "auto", width: "40%" }}
      >
        <div>
          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="off"
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            className="loginBtn"
          >
            Login
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Don't have an account?</p>
          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-outline-primary"
            onClick={goToSignup}
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}
