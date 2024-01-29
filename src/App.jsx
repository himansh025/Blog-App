import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router";

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    authService
      .isLoggedIn()
      .then((user) => user&&dispatch(login({userData: user})))
      .finally(setLoader(false));
  });

  useSelector(state=>console.log(state))

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;
