import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {CreatePost, EditPost, Login, Post, Signup, UserPosts} from "./pages";


const router = createBrowserRouter([
  {
    path : '/',
    element: <App/>,
    children:[
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <Signup/>
      },
      {
        path: 'create',
        element: <CreatePost/>
      },
      {
        path: 'post/:slug',
        element: <Post/>
      },
      {
        path: 'edit/:slug',
        element: <EditPost/>
      },
      {
        path: 'posts',
        element: <UserPosts/>
      },
  ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
