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
  // rows = [
  //   {
  //     id: "1",
  //     type: "Task",
  //     status: "active",
  //     slug: "/posts/5-tips-to-be-a-better-programmer",
  //     description: "description",
  //     name: "5 Tips to Be a Better Programmer",
  //   },
  //   {
  //     id: "2",
  //     type: "SubTask",
  //     status: "inactive",
  //     slug: "/posts/how-to-center-elements-using-css",
  //     description: "data",
  //     name: "How to Center Elements Using CSS",
  //   },
  //   {
  //     id: "3",
  //     type: "Task",
  //     status: "active",
  //     slug: "/posts/how-to-validate-javascript-forms-for-beginners",
  //     description: "source",
  //     name: "How to Validate Javascript Forms for Beginners",
  //   },
  //   {
  //     id: "4",
  //     type: "Task",
  //     status: "inactive",
  //     slug: "/posts/sort-array-method-you-need-to-know-this-cases",
  //     description: "description",
  //     name: "Sort Array Method - You Need to Know This Cases",
  //   },
  //   {
  //     id: "5",
  //     type: "Task",
  //     status: "active",
  //     slug: "/posts/25-coding-terms-for-beginners",
  //     description: "<p><strong><em><u>Hasdfa</u></em></strong></p>",
  //     name: "25 Coding Terms for Beginners",
  //   },
  //   {
  //     id: "6",
  //     type: "Task",
  //     status: "active",
  //     slug: "/posts/5-tips-to-be-a-better-programmer",
  //     description: "description",
  //     name: "5 Tips to Be a Better Programmer",
  //   },
  //   {
  //     id: "7",
  //     type: "SubTask",
  //     status: "inactive",
  //     slug: "/posts/how-to-center-elements-using-css",
  //     description: "data",
  //     name: "How to Center Elements Using CSS",
  //   },
  //   {
  //     id: "8",
  //     type: "Task",
  //     status: "active",
  //     slug: "/posts/how-to-validate-javascript-forms-for-beginners",
  //     description: "source",
  //     name: "How to Validate Javascript Forms for Beginners",
  //   },
  //   {
  //     id: "9",
  //     type: "Task",
  //     status: "inactive",
  //     slug: "/posts/sort-array-method-you-need-to-know-this-cases",
  //     description: "description",
  //     name: "Sort Array Method - You Need to Know This Cases",
  //   },
  //   {
  //     id: "10",
  //     type: "Task",
  //     status: "active",
  //     slug: "/posts/25-coding-terms-for-beginners",
  //     description: "<p><strong><em><u>Hasdfa</u></em></strong></p>",
  //     name: "25 Coding Terms for Beginners",
  //   },
  // ];

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
