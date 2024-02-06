import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Protected({children}) {
    const isLogged = useSelector(state=>state.isAuth)
  if (isLogged) return <>{children}</>;
  else return(
    <div className="container text-center px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">You are not allowed to be on this page</h1>
      <p className="mb-4">Please sign up or log in if you already have an account.</p>
      <div className="flex space-x-4 justify-center">
        <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">Sign Up</Link>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">Log In</Link>
      </div>
    </div>
  );
}

export default Protected;
