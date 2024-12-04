import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";

const SignUp = () => {
  const Navigate = useNavigate();
  const handleSignUp = ( email: string, password: string,  Name?: string) => {
    
      axios.post("http://localhost:8000/signUp", {
      name: Name,
      email: email,
      password: password,
    }).then((response) => {
      Navigate("/logIn");
      console.log(response, " here");
    }).catch((error) => {
      console.log(error, " here");
    });
   
  return true;
};

  return <Form signup={false} handleSubmit={handleSignUp} Port={"/logIn"} />;
};


export  default SignUp;