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
import Navbar from "./Components/Navbar/Navbar";
import Services from "./Pages/ServicesPage/Services";
import About from "./Pages/AboutPage/About";
import Purchase from "./Pages/PurchasePage/Purchase";

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
        <Navbar />
        <Routes>
          <Route path="/" element={<>{<Home />}</>} />

          <Route path="/userRegister" element={<>{<UserRegister />}</>} />
          <Route path="/userLogin" element={<>{<UserLogin />}</>} />
          <Route path="/userForgot" element={<>{<UserForgot />}</>} />
          <Route path="/userChange" element={<>{<UserChange />}</>} />

          <Route path="/about" element={<>{<About />}</>} />
          <Route path="/services" element={<>{<Services />}</>} />
          <Route path="/purchase" element={<>{<Purchase />}</>} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;
