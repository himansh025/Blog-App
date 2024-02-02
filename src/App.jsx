import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Container, Header } from "./components";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { login } from "./store/appSlice";

function App() {
  const dispatch = useDispatch()

  // to check the logged user on reload
  useEffect(()=>{
    authService.checkLoggedAccount().then((userData)=>{
      dispatch(login({userData}))
    })
  },[])
  
  return (
    <Container>
      <Header/>
      <Outlet />
    </Container>
  );
}

export default App;
