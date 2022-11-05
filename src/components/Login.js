import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import userIcon from "../assets/user.png";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const { newUser, setNewUser } = useContext(GlobalContext);

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
            <button className="loginBtn">Sign up</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
