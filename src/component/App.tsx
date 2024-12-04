import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import LogInPage from "./LogInPage";
import SignUp from "./SignUp";
import ChatBot from "./ChatBot";
import { useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const App = () => {
  const [token, setToken] = useState(false);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    //const token = localStorage.getItem('token');
    //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .post("http://localhost:8000/ChatBot")
      .then((response) => {
        console.log(response.data);
        setToken(response.data.authenticate);
        return token ? children : <Navigate to="/login" />;
      })
      .catch((error) => {
        console.log(error);
        console.log("login erorr");
      });
    console.log(token);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="rel w-full h-screen bg-white flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route
            path="/ChatBot"
            element={
              <ProtectedRoute>
                <ChatBot />
              </ProtectedRoute>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
