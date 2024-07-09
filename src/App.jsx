import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Container, Header, Loader } from "./components";
import { useEffect } from "react";
import authService from "./appwrite/auth.js";
import { login, setPublicPosts, triedLogin } from "./store/appSlice.js";
import { Toaster } from "react-hot-toast";
import appwriteService from "./appwrite/config.js";

function App() {
  const dispatch = useDispatch();

  // to check the logged user and userPosts on reload
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.checkLoggedAccount();
        if (userData) {
          console.log(userData);
          try {
            let userPosts = await appwriteService.getPosts(userData.$id);
            dispatch(login({ userData, userPosts: userPosts.documents || [] }));
          } catch (postError) {
            console.error("Error while getting user posts:", postError);
            dispatch(login({ userData, userPosts: [] }));
          }
        }
        try {
          const publicPosts = await appwriteService.getPosts();
          dispatch(setPublicPosts(publicPosts.documents || []));
        } catch (publicPostError) {
          console.error("Error while getting public posts:", publicPostError);
          dispatch(setPublicPosts([]));
        }
      } catch (authError) {
        console.error("Error while checking logged-in user:", authError);
      } finally {
        dispatch(triedLogin());
      }
    };
    fetchData();
  }, [dispatch]);

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
