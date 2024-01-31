import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import {Edit, Login, Post, Posts, Signup} from "./pages";
import PostForm from "./components/post-form/PostForm.jsx";


let router =  createBrowserRouter(createRoutesFromElements(
  <Route path="/" Component={App}>
    <Route path="posts" Component={Posts}/>
    <Route path="login" Component={Login}/>
    <Route path="signup" Component={Signup}/>
    <Route path="createPost" Component={PostForm}/>
    <Route path="post/:slug" Component={Post}/>
    <Route path="edit/:slug" Component={Edit}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
