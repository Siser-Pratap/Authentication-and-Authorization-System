import React from 'react'
import { signInSuccess } from '../redux/user/userSlice';
import app from "./firebase.js";
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';

const Oauth = () => {

   

  const handleClick = async() => {
    try {

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      // const res = await fetch("http://localhost:3000/api/auth/google", {
      //   method:'POST',
      //   headers:{'Content-Type': 'application/json'},
      //   body:JSON.stringify({
      //     name:"",
      //     email:"",
      //     photoURL:"",
      //   }),
      // });
      // const data = res.json();
      // signInSuccess(data);  

      
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <button onClick={handleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Continue with Google</button>
  )
}

export default Oauth