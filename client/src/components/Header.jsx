import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Header = () => {

  const currentUser = useSelector((state)=>state.user.currentUser);

  const handleClick = () =>{
    <Navigate to="/sign-in" />
  }
  

  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auther</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/profile'>
          
            {currentUser? <img src={currentUser.photo} alt="profile-picture" /> : <button onClick={handleClick}>Sign-in</button>}
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header