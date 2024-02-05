import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Container, Header } from "./components";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/appSlice";
import { Toaster } from "react-hot-toast";
import appwriteService from "./appwrite/config";

function App() {
  const dispatch = useDispatch()

  // to check the logged user and userPosts on reload
  useEffect(()=>{
    const fetchData = async()=>{
      const userData = await authService.checkLoggedAccount()
      if(userData){
        let userPosts = await appwriteService.getPosts()
        userPosts = userPosts.documents
        dispatch(login({userData, userPosts}))
      }
    }
    fetchData()
  },[])
  
  const loginTried = useSelector((state)=>state.loginTried)
  
  if(loginTried) 
  return (
    <Container>
            <Toaster/>
            <Header/>
            <Outlet />
    </Container>
  ) 
  else return<p>loading...</p>
}

export default App;
