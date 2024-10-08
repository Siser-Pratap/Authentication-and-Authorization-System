import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice.js';
import Oauth from '../components/Oauth.jsx';
import axios from 'axios';

const SignIn = () => {
  axios.defaults.withCredentials=true;
  
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=> state.user);
  // const [loading, setloading] = useState(false);
  // const [error, seterror] = useState(false);
  const [Message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();
    try {

        // setloading(true);
        dispatch(signInStart());
        // const res = await fetch("http://localhost:3000/api/auth/signin",{
        //   method:"POST",
        //   headers:{
        //     "Content-Type":"application/json",
        //   },
        //   body:JSON.stringify(formData),
        // })

        const res = await axios.post("http://localhost:3000/api/auth/signin", formData);
        console.log(res);

        const data = await res.data;
        console.log(data);
        if(data.message){
        alert(data.message);
        dispatch(signInFailure(data.message));
        }
        if(data._id){
          console.log(data);
          dispatch(signInSuccess(data));
          navigate("/");
        }
        
        
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
      
    }
    setFormData({});
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
        
      </form>
      <Oauth />
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? `${error}` || 'Something went wrong' : ''}
      </p>
    </div>
  );
}

export default SignIn