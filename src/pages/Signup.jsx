import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login } from '../store/appSlice';


function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate('/')
  const {handleSubmit, register} = useForm()
  const [error, setError] = useState(null)
  const submit = async(data) => {
    try {
      const userData = await authService.createUser(data)
      dispatch(login({userData}))
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  };


  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(submit)}>
        <Input type="text" minLength={4} placeholder="Enter your name"  label="Name" {...register('name', {required: true})}/>
        <Input type="email" placeholder="Enter your email" label="Email" {...register('email', {required: true})}/>
        <Input type="password" minLength={8} placeholder="Enter your password" label="Password" {...register('password', {required: true})}/>

        {error&& (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>.
      </p>
    </div>
  );
}

export default Signup;
