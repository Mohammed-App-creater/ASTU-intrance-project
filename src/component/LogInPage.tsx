import Form from "./Form";
import axios from "axios";

const LogIn = () => {

  const handleLogin = ( email: string, password: string) => {
    
      axios.post("http://localhost:8000/gemini/logIn", {
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      
      
    
    return true;
  };

  return <Form signup={true} Port={"/signUp"} handleSubmit={handleLogin} />;
};


export  default LogIn;