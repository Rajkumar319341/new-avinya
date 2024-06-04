import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import { APIData,org } from "./APIData";
import axios from "axios";

var mergeJSON = require("merge-json");
toast.configure();

// const clientId =
//   "1015629489355-s52cbmh887p91s3vll3d8isv9jvm5f2b.apps.googleusercontent.com";

const clientId =
  "1081156015474-r2nshfkfd28sf8euja595nbst66j884r.apps.googleusercontent.com";


gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: clientId,
    plugin_name: "chat",
    scope: ['https://www.googleapis.com/auth/userinfo.email' ,'https://www.googleapis.com/auth/userinfo.profile']
  });
});

function Login() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = (res) => {
    // console.log("Login Success:", res.profileObj);
    // console.log(res.profileObj.email);
    // const testdata = {
    // description: "Google Login",
    // email: res.profileObj.email,
    // phoneNumber: "0000000000",
    // status: "success",
    // user: res.profileObj.name,
    // userType: "user"}
    // // setShowloginButton(false);
    // // setShowlogoutButton(true);
    // console.log(testdata);
    // localStorage.setItem("sessiondetails", JSON.stringify(testdata));
    // window.location.reload();
    const reqdata = {
      "org":org,
      "otp": 0,
      "user_email": res.profileObj.email,
      "user_name": res.profileObj.name,
      "user_password": "SL@"+res.profileObj.givenName,
      "user_phone_number": "9999999999"
    }
    console.log(res);

    axios
        .post(APIData.api + "users/register/social-web/google", reqdata, {
          headers: APIData.headers,
        })
        .then((response) => {
          console.log(response)
          {
            if (response.data.status.toString().toLowerCase() == "success") {
              var type = { userType: "user" };
              var storedata = mergeJSON.merge(type, response.data);
              console.log("response google",storedata);
              console.log(response.data);

              localStorage.setItem("sessiondetails", JSON.stringify(storedata));
              // window.location.reload();
             
            } else {
              toast(response.data.errorDesc);
            }
          }
        })


  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <div>
      {showloginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Continue with Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
        //   cookiePolicy={"single_host_origin"}
        //   isSignedIn={true}
        theme='dark'
        
        />
      ) : null}

      {showlogoutButton ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
          ux_mode="popup"
        ></GoogleLogout>
      ) : null}
    </div>
  );
}
export default Login;
