import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
// import {useSelector} from "react-redux";
 
const SignIn = () => {
  
  const [formData, setFormData] = useState({});
  // const { loading, error } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleChange = (e) => {
    
  };

  const handleSubmit = async (e) => {
    


  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          // disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
  );
}

export default SignIn