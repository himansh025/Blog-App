import { useSelector } from "react-redux";
import appwriteService from "./appwrite/config";
import { Outlet } from "react-router";
import { Container, Header } from "./components";

function App() {
  useSelector((state) => console.log(state));
  return (
    <Container>
      <Header/>
      <Outlet />
    </Container>
  );
}

export default App;
