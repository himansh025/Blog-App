import { Container, Logo, Button } from "../";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login, logout } from "../../store/authSlice";

function Header() {
  let isLogged = useSelector((state) => state.status);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async() =>{
    await authService.logoutUser()
    dispatch(logout())
  }
  const links = [
    {
      name: "Home",
      slug: "/",
      visible: true,
    },
    {
      name: "Create",
      slug: "/createPost",
      visible: isLogged,
    },
    {
      name: "Edit",
      slug: "/editPost",
      visible: isLogged,
    },
    {
      name: "Posts",
      slug: "/posts",
      visible: isLogged,
    },
  ];

  return (
    <nav>
      <Container>
        <ul className="flex justify-center items-center">
          <li>
            <Link>
              <Logo></Logo>
            </Link>
          </li>
          {links.map(
            (link) =>
              link.visible && (
                <li key={link.name}>
                  <Button>{link.name}</Button>
                </li>
              )
          )}
          <li className={`${isLogged && "hidden"}`}>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </li>
          <li className={`${isLogged && "hidden"}`}>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </li>
          <li className={`${!isLogged && "hidden"}`} onClick={logoutHandler}>
            <Button>Logout</Button>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Header;
