import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import userIcon from "../assets/user.png";
import {
  auth,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { newUser, setNewUser } = useContext(GlobalContext);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      setNewUser(user.uid);
      setPage("home");
    }
  }, [user, loading]);

  const register = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    registerWithEmailAndPassword(email, password);
    setPage("home");
  };

  return (
    <div className="loginPage">
      <div className="loginWrapper">
        <img className="userIcon" src={userIcon} />
        <div className="emailAndPassword">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ul className="loginButtons">
          <li>
            <button
              onClick={() => logInWithEmailAndPassword(email, password)}
              className="loginBtn"
            >
              Sign In
            </button>
          </li>
          <li>
            <button onClick={() => register()} className="loginBtn">
              Register
            </button>
          </li>
          <li>
            <button
              className="loginBtn"
              onClick={() =>
                logInWithEmailAndPassword("guest@gmail.com", "123456")
              }
            >
              Continue as guest
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
