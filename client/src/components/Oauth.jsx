import React from 'react'
import { signInSuccess } from '../redux/user/userSlice';
import app from "./firebase.js";
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Oauth = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();

  const handleClick = async() => {
    try {

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photoURL:result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));  
      navigate("/");

      
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className=' mx-auto flex flex-col max-w-xl '>
    <button onClick={handleClick} className='bg-red-700 mt-2  text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Continue with Google</button>
    </div>
  )
}

export default Oauth