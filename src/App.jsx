import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";
import Auth from "./Auth";
import Todo from "./Todo";
//
function App() {
  const [session, setSession] = useState(null);
  const fetchSession = async () => {
    const currentSessions = await supabase.auth.getSession();
    console.log(currentSessions);
    setSession(currentSessions.data.session);
  };

  useEffect(() => {
    fetchSession();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <button
        onClick={() => logout()}
        className="bg-red-300 p-1 hover:bg-red-400"
      >
        logout
      </button>
      {session ? <Todo /> : <Auth />}
    </div>
  );
}
export default App;
//53:46
