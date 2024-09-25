import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setcomplete] = useState(false);
  const [Message, setMessage] = useState("");
  const navigate = useNavigate();;

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      
      setLoading(true);
      
      const res = await fetch("http://localhost:3000/api/auth/signup", {
          method:"POST",
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify(formData),
        })
        
        const data = await res.json();
        console.log(data);
        if(data.success === false){
          setError("Something went wrong");
        }
        
        setMessage(data.message);
        if(data.message === "User already registered"){
          setcomplete(true);
        }
        setLoading(false);
        if(data.message === "User created Successfully"){
          alert("User created successfully");
          navigate("/sign-in");
        }
      

    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value});
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='Username'
        id='username'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
        
      />
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
        disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
      {/* <OAuth /> */}
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
      </Link>
    </div>
    <p className='text-red-700 exists mt-5'>{error && 'Something went wrong!'}</p>
    <p className='text-red-700 exists mt-5 mb-5 mr-2'>{setMessage && `${Message}`}</p>
    {complete && 
    <Link to="/sign-in"  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{"SignIn!"}</Link>
    }
    
  </div>
  )
}

export default SignUp