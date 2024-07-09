import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login } from '../store/appSlice';
import toast from 'react-hot-toast';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate('/');
  const { handleSubmit, register } = useForm();

  const submit = async (data) => {
    try {
      // Check if a session already exists
      const existingSession = await authService.checkLoggedAccount();
      if (existingSession) {
        toast.error("A session is already active. Please log out first.", { position: "bottom-center" });
        return;
      }

      // Create a new user
      await authService.createUser(data);
      const userData = await authService.checkLoggedAccount();
      dispatch(login({ userData, userPosts: [] }));
      navigate('/');
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <Input
          type="text"
          minLength={4}
          placeholder="Enter your name"
          label="Name"
          {...register('name', { required: true })}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          label="Email"
          {...register('email', { required: true })}
        />
        <Input
          type="password"
          minLength={8}
          placeholder="Enter your password"
          label="Password"
          {...register('password', { required: true })}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default Signup;
