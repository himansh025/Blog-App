import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appwriteBucketID } from "./conf/conf";
import authService from "./appwrite/auth";
import service from "./appwrite/config";
import { login } from "./store/authSlice";

function App() {
  //  authService.createAccount({email: 'test2@gmail.com', password: '1meonlY42', name: 'test2'})
  // service.createPost({
  //   content: 'hello hi bye bye',
  //   name: 'my post',
  //   imageURL: 'noimage.com'
  // })
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .isLoggedIn()
      .then((user) => dispatch(login({userData: user})))
      .finally(setLoader(false));
  });

  useSelector(state=>console.log(state))

  return (
    <div className="flex h-screen justify-center items-center bg-red-100 text-5xl">
      Quick React Setup with Tailwind
    </div>
  );
}

export default App;
