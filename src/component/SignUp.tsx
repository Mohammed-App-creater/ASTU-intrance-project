import Form from "./Form";
import axios from "axios";

const SignUp = () => {

  const handleSignUp = ( email: string, password: string,  Name?: string) => {
    
      axios.post("http://localhost:8000/signUp", {
      name: Name,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  
  return true;
};

  return <Form signup={false} handleSubmit={handleSignUp} Port={"/logIn"} />;
};


export  default SignUp;