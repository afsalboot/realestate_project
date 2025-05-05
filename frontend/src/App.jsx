import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import HomePage from './pages/HomePage/HomePage'
import ListPage from './pages/listPage/ListPage'
import {Layout,  RequireAuth } from './pages/layout/Layout'
import SinglePage from './pages/singlePage/SinglePage'
import ProfilePage from './pages/profile/ProfilePage'
import LoginPage from './pages/loginPage/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ProfileUpdate from './pages/ProfileUpdatePage/ProfileUpdate'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/list",
          element: <ListPage/>
        },
        {
          path: "/:id",
          element: <SinglePage/>
        },
        {
          path: "/login",
          element: <LoginPage/>
        },
        {
          path: "/register",
          element: <RegisterPage/>
        },
      ]
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children:[
        {
          path: "/profile",
          element: <ProfilePage/>
        },
        {
          path: "/profile/update",
          element: <ProfileUpdate/>
        },
      ]
    }
    
    
  ])
  return (
    

    <RouterProvider router={router}/>
  );
}

export default App
