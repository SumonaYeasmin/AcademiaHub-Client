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

import AddClass from "../pages/Dashboard/AddClass/AddClass";
import ClassDetails from "../pages/AllClasses/ClassDetails/ClassDetails";
import MyClass from "../pages/Dashboard/MyClass/MyClass";
import MyClassDetails from "../pages/Dashboard/MyClass/MyClassDetails/MyClassDetails";
import Profile from "../pages/Shared/Profile/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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
            element: <PrivateRoute><TeachOnAcademiaHub></TeachOnAcademiaHub></PrivateRoute> ,
            
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
          {
            path: '/dashboard/my-class',
            element: <MyClass></MyClass>
          },
          {
            path: '/dashboard/my-class/:id',
            element: <MyClassDetails></MyClassDetails>
          },
        ]
    }
  ]);
  export default router;