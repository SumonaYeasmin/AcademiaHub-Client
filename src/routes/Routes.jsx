import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnAcademiaHub from "../pages/TeachOnAcademiaHub/TeachOnAcademiaHub";
import Dashboard from "../layouts/Dashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import TeacherRequest from "../pages/Dashboard/TeacherRequest/TeacherRequest";
import Users from "../pages/Dashboard/Users/Users";
import AllClass from "../pages/Dashboard/AllClasses/AllClass";
import Profile from "../pages/Dashboard/Profile/Profile";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import ClassDetails from "../pages/AllClasses/ClassDetails/ClassDetails";

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
            path: "/classes/:id",
            element: <ClassDetails></ClassDetails>,
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
        children: [
          {
            path: '/dashboard/teacher-request',
            element: <TeacherRequest></TeacherRequest>
          },
          {
            path: '/dashboard/users',
            element: <Users></Users>
          },
          {
            path: '/dashboard/all-class',
            element: <AllClass />
          },
          {
            path: '/dashboard/profile',
            element: <Profile></Profile>
          },
          {
            path: '/dashboard/add-class',
            element: <AddClass></AddClass>
          },
        ]
    }
  ]);
  export default router;