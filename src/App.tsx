import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

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
      <Suspense
        fallback={
          <div>
            <h1 style={{ textAlign: "center" }}>Loading ....</h1>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthRouter />}>
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/view/:id" element={<View />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
