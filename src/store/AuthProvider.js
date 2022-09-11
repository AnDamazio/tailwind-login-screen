import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const savedUserLogin = localStorage.getItem("isLoggedIn");
  const savedUserRemember = localStorage.getItem("remember");

  const [isLoggedIn, setIsLoggedIn] = useState(savedUserLogin);
  const [remember, setRemember] = useState(savedUserRemember);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setRemember(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("remember");
    console.log(isLoggedIn);
  };

  const loginHandler = () => {
    console.log(isLoggedIn);
    console.log(remember);
    switch (remember) {
      case true:
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("remember", true);
        break;
      case false:
        setIsLoggedIn(true);
        break;
      case null:
        setIsLoggedIn(true);
        break;
      default:
        break;
    }
  };

  const rememberHandler = (state) => {
    setRemember(state);
  };

  const authContext = {
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
    remember: remember,
    checkRemember: rememberHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
