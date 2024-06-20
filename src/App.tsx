import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Routes as Url } from "./assets/urls";
import Lodding from "./component/Lodding";

const List = lazy(() => import("./component/List"));
const Signup = lazy(() => import("./component/auth/Signup"));
const Login = lazy(() => import("./component/auth/Login"));
const Add = lazy(() => import("./component/Add"));
const Edit = lazy(() => import("./component/Edit"));
const View = lazy(() => import("./component/View"));
const AuthRouter = lazy(() => import("./component/protectRoute/AuthRouter"));

function App() {
  return (
    <>
      <Suspense fallback={<Lodding />}>
        <Routes>
          <Route path={Url.HOME} element={<List />} />
          <Route path={Url.SIGNUP} element={<Signup />} />
          <Route path={Url.LOGIN} element={<Login />} />
          <Route element={<AuthRouter />}>
            <Route path={Url.ADD} element={<Add />} />
            <Route path={Url.EDIT} element={<Edit />} />
            <Route path={Url.VIEW} element={<View />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
