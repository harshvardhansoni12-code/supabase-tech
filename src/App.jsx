import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";
import Auth from "./Auth";
import Todo from "./Todo";
function App() {
  const [session, setSession] = useState(null);
  const fetchSession = async () => {
    const currentSessions = await supabase.auth.getSession();
    console.log(currentSessions);
    setSession(currentSessions.data);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <button onClick={logout}>logout</button>
      {session ? <Todo /> : <Auth />}
    </div>
  );
}
export default App;
//53:46
