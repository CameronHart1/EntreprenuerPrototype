import { useParams } from "react-router-dom";
import "../CSS/Login_SignUp.css";
import "../CSS/form.css"

export const SignIn = () => {
  let {signtype} = useParams();

  // HTML here
  return (
    // needs to be in a div
    <div className="background">
      <div>
        <h1 className="Title">Kontrolia</h1>
      </div>
      <div class='SignInUpBox'>
        <div className="form-box">
          <div id="whatvevr the white box is gonna be">
            {signtype == "signin"? <SignInInterior /> : <SignUpInterior />}
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInInterior = () => {
  return (
    // needs to be in a div
    <div>
        <h1>Sign in</h1>
        <form>
          <label>New User?</label>
          <label>Username or email:</label>
          <input
            type='text'
            required
          />
          <label>Password:</label>
          <input
            type='text'
            required
          />
        </form>
        <button className='LoginSignUpLabel'>Sign In</button>
    </div>
  );
};

const SignUpInterior = () => {
  return (
    // needs to be in a div
    <div class="form">
      <h1>Sign up</h1>
        <form>
          <label>Already a user?</label>
          <label>Email:</label>
          <input
            type='text'
            required
          />
          <label>Password:</label>
          <input
            type='text'
            required
          />
          <label>Comfirm Password:</label>
          <input
            type='text'
            required
          />
        </form>
        <button className='LoginSignUpLabel'>Sign Up</button>

    </div>
  );
};
