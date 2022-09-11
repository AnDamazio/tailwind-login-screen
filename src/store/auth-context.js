import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  remember: false,
  checkRemember: () => {},
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export default AuthContext;
