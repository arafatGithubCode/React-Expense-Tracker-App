import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Auth from "./pages/auth/Auth";
import ExpenseTracker from "./pages/expense-tracker";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" exact element={<ExpenseTracker />} />
          <Route path="*" exact element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
