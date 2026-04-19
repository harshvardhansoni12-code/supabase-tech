import { useState } from "react";
import { supabase } from "./supabase-client";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log(email, password);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.log("error signing up", error.message);
        return;
      }
    } else {
      console.log(email, password);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("error signing in ", error.message);
      }
    }
  };
  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} className="m-1 bg-amber-400 rounded-xl">
        Submit
      </button>
      <button
        onClick={() => setIsSignUp((e) => !e)}
        className="m-1 bg-amber-400 rounded-xl"
      >
        switch to sign in
      </button>
    </div>
  );
};

//45:13
export default Auth;
