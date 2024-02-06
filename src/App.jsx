import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Container, Header, Loader } from "./components";
import { useEffect } from "react";
import authService from "./appwrite/auth.js";
import { login, logout, triedLogin } from "./store/appSlice.js";
import { Toaster } from "react-hot-toast";
import appwriteService from "./appwrite/config.js";

function App() {
  const dispatch = useDispatch();

  // to check the logged user and userPosts on reload
  useEffect(() => {
    const fetchData = async () => {
      const userData = await authService.checkLoggedAccount();
      if (userData) {
        let userPosts = await appwriteService.getPosts();
        userPosts = userPosts.documents;
        dispatch(login({ userData, userPosts }));
      }
      dispatch(triedLogin());
    };
    fetchData();
  }, []);

  const loginTried = useSelector((state) => state.loginTried);

  if (loginTried)
    return (
      <Container>
        <Toaster />
        <Header />
        <Outlet />
      </Container>
    );
  else return <Loader />;
}

export default App;
