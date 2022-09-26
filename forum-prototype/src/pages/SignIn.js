import { useParams } from "react-router-dom";
import "../CSS/Login_SignUp.css";

export const SignIn = () => {
  let {signtype} = useParams();

  // HTML here
  return (
    // needs to be in a div
    <div className="background">
      <div id="whatvevr the white box is gonna be">
        {signtype == "signin"? <SignInInterior /> : <SignUpInterior />}
      </div>
    </div>
  );
};

const SignInInterior = () => {
  return (
    // needs to be in a div
    <div>
      <h1>Sign In</h1>
    </div>
  );
};

const SignUpInterior = () => {
  return (
    // needs to be in a div
    <div>
      <h1>Sign Up</h1>
    </div>
  );
};
