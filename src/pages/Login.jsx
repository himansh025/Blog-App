import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/appSlice";
import appwriteService from "../appwrite/config";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { handleSubmit, register} = useForm();
  const submit = async(data) =>{
    try {
        const userData = await authService.loginUser(data)
        console.log(userData)
        if(userData){
          let userPosts = await appwriteService.getPosts(userData.userId)
          console.log("if statement ran!!")
          console.log(userPosts)
          userPosts = userPosts.documents
          dispatch(login({userData, userPosts}))
        }
        navigate('/')
    } catch (error) {
        toast.error(error.message, {position: "bottom-center"})
        console.log(error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="email"
          placeholder="Enter your email"
          label="Email"
          {...register("email", { required: true })}
        />
        <Input
          minLength={8}
          type="password"
          placeholder="Enter your password"
          label="Password"
          {...register("password", { required: true })}
        />

        <Button
          type="submit"
        >
          Login
        </Button>
      </form>
      <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up here
        </Link>
        .
      </p>
    </div>
  );
}

export default Login;
