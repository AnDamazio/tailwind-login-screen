import { useContext } from "react";
import "./App.css";
import HomePage from "./components/Layout/Homepage";
import Login from "./components/Login/Login";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn)
  console.log(authCtx.remember)

  return (
    <main>
      {!authCtx.isLoggedIn && <Login />}
      {authCtx.isLoggedIn && <HomePage />}
    </main>
  );
}

export default App;
