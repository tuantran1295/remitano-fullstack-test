import HomePage from "./pages/home/HomePage.js";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/Register";
import SharingPage from "./pages/sharing/Sharing";


export const routes = [
  { path: '/login', exact: true, component: <LoginPage/> },
  { path: '/', exact: true, component: <HomePage/> },
  { path: '/register', exact: true, component: <RegisterPage/> },
  { path: '/sharing', exact: true, component: <SharingPage/> },


];
