import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
    <div className="login">
      <div className="loginWrapper">
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
          <button
            onClick={() => logInWithEmailAndPassword(email, password)}
            className="loginBtn"
          >
            Sign In
          </button>
          <button className="loginBtn">Sign up</button>
        </div>
      </div>
    </div>
  );
}
