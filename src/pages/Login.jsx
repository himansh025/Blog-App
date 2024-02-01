import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState(null)


  const { handleSubmit, register} = useForm();
  const submit = async(data) =>{
    try {
        await authService.createUser(data)
        
    } catch (error) {
        console.log(error, 'yahan error hai')
        setError(error)
    }
    // console.log(error)
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
          type="password"
          placeholder="Enter your password"
          label="Password"
          {...register("password", { required: true })}
        />

        {error && <div className="text-red-500 mb-4">{loginError}</div>}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
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
