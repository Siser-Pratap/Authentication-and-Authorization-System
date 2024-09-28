import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect} from 'react';
import app from '../components/firebase.js';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {updateUserSuccess,updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure, updateUserStart, } from "../redux/user/userSlice.js";
  import { useDispatch } from 'react-redux';


const Profile = () => {
  
  const [image, setimage] = useState(undefined);
  const [imageError, setimageError] = useState(false);
  const [imagePercent, setimagePercent] = useState(0);
  
  const [updateSuccess, setupdateSuccess] = useState();
  
  const [formData, setformData] = useState({});

  const {loading, error} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const User = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleChangeImage = () =>{
    fileRef.current.click();
  }

  const handleImageChange = (e) => {
    
    setimage(e.target.files[0]);
    
  }
  
  useEffect(() => {
    if(image){
    handleFileUpload(image);
    }
  }, [image]);
  

  const handleFileUpload = async(image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimagePercent(Math.round(progress));
      },
      (error) => {
        setimageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setformData({ ...formData, photo: downloadURL })
        );
      }
    );

    
  }

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`https://localhost:3000/api/user/update/${User._id}`, {
        method: "POST",
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      User
      

      
      
    } catch (error) {
      console.log(error);
    }
  }

 

  const handleChange = (e) =>{
    setformData({...formData, [e.target.id]: e.target.value});
  }


  const handleDeleteAccount = () =>{}

  const handleSignOut = () =>{}


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden onChange={handleImageChange} accept="image/*"  />
        <img
          src={User.photo}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={handleChangeImage}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={User.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={User.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        </form>
        <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteAccount}
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>

    </div>
  )
}

export default Profile