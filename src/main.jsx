import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import {CreatePost, Login, Signup} from "./pages";


let router =  createBrowserRouter(createRoutesFromElements(
  <Route path="/" Component={App}>
    <Route path="login" Component={Login}/>
    <Route path="signup" Component={Signup}/>
    <Route path="createPost" Component={CreatePost}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
