import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from '../components';


function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Dispatch signup action here
    
  };

  const signupError = useSelector(state => state.signupError);
  console.log()

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form>
        <Input type="text" placeholder="Enter your name" value={email} onChange={(e) => setEmail(e.target.value)} label="Name" />
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
        <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" />

        {signupError && (
          <div className="text-red-500 mb-4">
            {signupError}
          </div>
        )}

        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSignup}
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
