import React, { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (!email) alert("Please enter email");
    registerWithEmailAndPassword(email, password);
  };

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
          <button onClick={() => register()} className="loginBtn">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
