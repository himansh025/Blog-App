import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Protected } from "./components/index.js";
import { AllPosts, CreatePost, EditPost, Login, NotFound, Post, Signup, UserPosts } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AllPosts/>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "create",
        element: (
          <Protected >
            <CreatePost />
          </Protected>
        ),
      },
      {
        path: "post/:slug",
        element: (
          // <Protected >
            <Post/>
          // </Protected>
        ),
      },
      {
        path: "edit/:slug",
        element: (
          <Protected >
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "posts",
        element: (
          <Protected >
            <UserPosts />
          </Protected>
        ),
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
