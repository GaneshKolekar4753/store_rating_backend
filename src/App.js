import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import UserDashBoard from "./components/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
import Signup from "./pages/Signup";
import "./App.css";
import HomeDashBoard from "./pages/HomeDashBoard";
import { DisplayElementProvider } from "./context/ComponentContext";
import { StateProvider } from "./context/globalState";

const App = () => {
  const islogged = localStorage.getItem("authToken");
  //if user is not logged then it will go to login page
  const ProtectedRoute = ({ children }) => {
    if (islogged == null) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <DisplayElementProvider>
      <StateProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeDashBoard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      </StateProvider>
      </DisplayElementProvider>
    </Router>
  );
};

export default App;
