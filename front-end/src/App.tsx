import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MainContainer } from "./Core-UI/MainContainer";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import Home from "./Pages/MainPage/Home";
import UserRegister from "./Pages/UserPage/UserRegister";
import UserLogin from "./Pages/UserPage/UserLogin";
import UserForgot from "./Pages/UserPage/UserForgot";
import UserChange from "./Pages/UserPage/UserChange";
import ScrollToTop from "./Core-UI/ScrollToTop";
import Notifications from "./Components/Notifications/Notifications";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Services from "./Pages/ServicesPage/Services";
import About from "./Pages/AboutPage/About";
import Purchase from "./Pages/PurchasePage/Purchase";
import UserProfile from "./Pages/UserProfile/UserProfile";
import UserProfileSetting from "./Pages/UserProfile/UserProfileSetting";
import NotFound from "./Pages/ErrorPage/NotFound";

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
        <Sidebar />
        <Routes>
          <Route path="/" element={<>{<Home />}</>} />

          <Route
            path="/userRegister"
            element={
              <>
                {
                  <PublicRoute>
                    <UserRegister />
                  </PublicRoute>
                }
              </>
            }
          />
          <Route
            path="/userLogin"
            element={
              <>
                {
                  <PublicRoute>
                    <UserLogin />
                  </PublicRoute>
                }
              </>
            }
          />
          <Route
            path="/userForgot"
            element={
              <>
                {
                  <PublicRoute>
                    <UserForgot />
                  </PublicRoute>
                }
              </>
            }
          />
          {/* <Route path="/userChange" element={<>{<UserChange />}</>} />*/}

          <Route
            path="/userProfile"
            element={
              <>
                {
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              </>
            }
          />

          <Route
            path="/userProfileSetting"
            element={
              <>
                {
                  <PrivateRoute>
                    <UserProfileSetting />
                  </PrivateRoute>
                }
              </>
            }
          />

          <Route path="/about" element={<>{<About />}</>} />
          <Route path="/services" element={<>{<Services />}</>} />
          <Route path="/purchase" element={<>{<Purchase />}</>} />

          {/* The last route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;
