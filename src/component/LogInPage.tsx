import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const Navigate = useNavigate();
  const handleLogin = (email: string, password: string) => {
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response)
        if (response.data.authenticate) {
          //localStorage.setItem("token", response.data.token);
          Navigate("/ChatBot");
        }else{
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("login erorr");
      });

    return true;
  };

  return <Form signup={true} Port={"/signUp"} handleSubmit={handleLogin} />;
};

export default LogIn;
