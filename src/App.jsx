import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import ExpenseTracker from "./pages/expense-tracker";
import Error from "./pages/Error";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<SignUp />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/expense-tracker" exact element={<ExpenseTracker />} />
          <Route path="*" exact element={<Error />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
