import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/Login_SignUp.css";
import "../CSS/form.css";
import { UserCred } from "../DataObjects/DataBases/User-Credentials";
import { UserProfiles } from "../DataObjects/DataBases/User-Profiles";
import { useContext, useState } from "react";
import { UserContext } from "../context/user.context";

export const SignIn = () => {
  let { signtype } = useParams();

  const { setCurrentUser } = useContext(UserContext);

  const [content, setContent] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password } = content;
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const Login = (e) => {
    var warnings = 0;
    if (username == "") {
      console.warn("Invalid Username");
      warnings += 1;
    }
    if (password == "") {
      console.warn("Invalid Password");
      warnings += 1;
    }
    if (warnings > 0) return 0;

    var id = null;
    try {
      id = UserCred.find(
        (x) =>
          (x.username == username || x.email == username) &&
          x.password == password
      ).id;
    } catch (e) {
      console.warn("User not found");
      return 0;
    }
    setCurrentUser(UserProfiles[id]);
    nav("/");
  };

  // const Login = ()
  // HTML here
  return (
    // needs to be in a div
    <div className="background">
      <div>
        <h1 className="Title">Kontrolia</h1>
      </div>
      <div className="SignInUpBox">
        <div className="form-box">
          <div id="whatvevr the white box is gonna be">
            {signtype == "signin" ? (
              <SignInInterior handleChange={handleChange} Login={Login} />
            ) : (
              <SignUpInterior handleChange={handleChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInInterior = (props) => {
  const { handleChange, Login } = props;

  return (
    // needs to be in a div
    <div>
      <h1>Sign in</h1>

      <Link to={"/account/signup"}>
        <label className="ClickableLabel">New User?</label>
      </Link>
      <label>Username or email:</label>
      <input type="text" name="username" onChange={handleChange} />
      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} />

      <button className="LoginSignUpLabel" onClick={Login}>
        Sign In
      </button>
    </div>
  );
};

const SignUpInterior = (props) => {
  const { handleChange } = props;
  return (
    // needs to be in a div
    <div class="form">
      <h1>Sign up</h1>

      <Link to={"/account/signin"}>
        <label className="ClickableLabel">Already a user?</label>
      </Link>
      <label>Email:</label>
      <input type="text" name="username" onChange={handleChange} />
      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} />
      <label>Comfirm Password:</label>
      <input type="password" name="confrimPassword" onChange={handleChange} />

      <button className="LoginSignUpLabel">Sign Up</button>
    </div>
  );
};
