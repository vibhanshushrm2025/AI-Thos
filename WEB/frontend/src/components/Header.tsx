import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
            <NavigationLink
                bg="rgb(25, 118, 210,0.4)"
                to="/chat"
                text="Go To Chat"
                textColor="white"
              />
            <NavigationLink
                bg="rgb(25, 118, 210,0.4)"
                to="/questionnaire"
                text="Questionnaire Simulator"
                textColor="white"
              />
            <NavigationLink
                bg="rgb(25, 118, 210,0.4)"
                to="/xyz"
                text="Realtime Simulator"
                textColor="white"
              />
              <NavigationLink
                bg="rgb(210, 3, 3)"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
