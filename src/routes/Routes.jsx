import { createBrowserRouter } from "react-router-dom";
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
import Payment from "../pages/Payment/Payment";
import MyEnrollClass from "../pages/Dashboard/MyEnrollClass/MyEnrollClass";
import EnrollClassDetails from "../pages/Dashboard/MyEnrollClass/EnrollClassDetails/EnrollClassDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SuccessStoriesDetails from "../pages/Home/SuccessStories/SuccessStoriesDetails/SuccessStoriesDetails";
import CommunityForum from "../pages/CommunityForm/CommunityForm";
import ContactUs from "../pages/Home/ContactUs/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
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
        element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>,
      },
      {
        path: "/payment",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
      },
      {
        path: "/teachOnAcademiaHub",
        element: <PrivateRoute><TeachOnAcademiaHub></TeachOnAcademiaHub></PrivateRoute>,

      },
      {
        path: "/signIn",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register></Register>
      },

      {
        path: "/successStoriesDetails/:id",
        element: <SuccessStoriesDetails></SuccessStoriesDetails>
      },
      {
        path: "/communityForm",
        element: <PrivateRoute><CommunityForum></CommunityForum></PrivateRoute>
      },
      {
        path:"/contactUs",
        element: <ContactUs></ContactUs>
      }
      // {
      //   path: "*",
      //   element: <ErrorPage></ErrorPage>
      // },
    ]
  },

  // Dashboard

  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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

      // Teacher Dashboard
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


      // Student Dashboard
      {
        path: '/dashboard/my-enroll-class',
        element: <MyEnrollClass></MyEnrollClass>
      },
      {
        path: '/dashboard/myenroll-class/:id',
        element: <EnrollClassDetails></EnrollClassDetails>
      },
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>
      }
    ]
  }
]);
export default router;