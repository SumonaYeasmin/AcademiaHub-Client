import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnAcademiaHub from "../pages/TeachOnAcademiaHub/TeachOnAcademiaHub";
import Dashboard from "../layouts/Dashboard";
import SignIn from "../pages/SignIn/SignIn";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
 const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
      children:[
        {
            path: "/",
            element: <Home />
          },
          {
            path: "/allClasses",
            element: <AllClasses></AllClasses>,
          },
          {
            path: "/teachOnAcademiaHub",
            element: <TeachOnAcademiaHub></TeachOnAcademiaHub>,
            
          },
          {
            path: "/signIn",
            element: <Login />
          },
          {
            path: "/register",
            element: <Register></Register>
          },
      ]
    },
    {
        path: "/dashboard",
        element:<Dashboard></Dashboard>,
    }
  ]);
  export default router;