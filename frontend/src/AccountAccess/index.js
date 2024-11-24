import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function AccountAccess() {
  const [profile, setProfile] = useState(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem("token", codeResponse.access_token);
      fetchProfile(); // Fetch profile immediately after login success
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    if (userId) {
      window.location.href = `/projects/${userId}`;
    } else if (token) {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data: userInfo } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const { data: result } = await axios.post(
        process.env.REACT_APP_API_URL+"/checkuser",
        { email: userInfo.email },
      );

      if (result.message === "User not found") {
        setProfile(userInfo);
      } else if (result.message === "User found") {
        localStorage.setItem("userid", result.userid);
        window.location.href = `/projects/${result.userid}`;
      }
    } catch (error) {
      console.error("Error fetching profile or checking user:", error);
    }
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.clear();
  };

  const createUser = async () => {
    try {
      const { data: result } = await axios.post(
        process.env.REACT_APP_API_URL+"/createuser",
        {
          email: emailRef.current.value,
          name: nameRef.current.value,
        },
      );

      localStorage.setItem("userid", result.userid);
      window.location.href = `/projects/${result.userid}`;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="AccountAccess">
     
     <div className="Nav">
      <div className="Logo"></div>
    </div>

      <div className="title">
        Log in or sign up in <span>seconds!</span>
      </div>
      <div className="subtitle">
        Use your email or another service to continue with Toggle (it's free)!
      </div>

      {profile?.name ? (
        <div className="name">
          <input
            ref={emailRef}
            type="email"
            disabled
            defaultValue={profile.email}
          />
          <input
            ref={nameRef}
            type="text"
            placeholder="Your name"
            defaultValue={profile.name}
          />
          <button onClick={createUser}>Next</button>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={login}>
          <img
            alt="Google login"
            src="https://www.edigitalagency.com.au/wp-content/uploads/google-logo-icon-PNG-Transparent-Background-letter-G-multiple-colors.png"
          />
          Continue with Google
        </button>
      )}

      <div className="privacy">
        By continuing, you agree to Toggle's Terms of Use. Read our Privacy
        Policy.
      </div>
    </div>
  );
}

export default AccountAccess;
