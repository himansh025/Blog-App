import React, { useEffect, useState } from "react";
import {useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login } from "./store/authSlice";
import { Footer, Header} from "./components";
import { Outlet, useNavigate } from "react-router";
import service from "./appwrite/config";

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    authService
      .isLoggedIn()
      .then((user) => user&&dispatch(login({userData: user})))
      .finally(setLoader(false));
  });


  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;
