import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MainContainer } from "./Core-UI/MainContainer";
import Home from "./Pages/MainPage/Home";
import UserRegister from "./Pages/UserPage/UserRegister";
import UserLogin from "./Pages/UserPage/UserLogin";
import UserForgot from "./Pages/UserPage/UserForgot";
import UserChange from "./Pages/UserPage/UserChange";
import ScrollToTop from "./Core-UI/ScrollToTop";
import Notifications from "./Components/Notifications/Notifications";

function App() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      
      <MainContainer>
        <ScrollToTop />
        <Notifications />
        <Routes>
          <Route path="/" element={<>{<Home />}</>} />
          <Route path="/userRegister" element={<>{<UserRegister />}</>} />
          <Route path="/userLogin" element={<>{<UserLogin />}</>} />
          <Route path="/userForgot" element={<>{<UserForgot />}</>} />
          <Route path="/userChange" element={<>{<UserChange />}</>} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;
