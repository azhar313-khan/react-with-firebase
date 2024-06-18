import "./App.css";
import { Route, Routes } from "react-router-dom";
import List from "./component/List";
import View from "./component/View";
import Edit from "./component/Edit";
import Add from "./component/Add";
import Signup from "./component/auth/Signup";
import Login from "./component/auth/Login";
import AuthRouter from "./component/protectRoute/AuthRouter";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
