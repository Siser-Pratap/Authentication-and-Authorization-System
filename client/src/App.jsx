import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import PrivateRouteLogin from './components/PrivateRouteLogin';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <main>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route element={<PrivateRouteLogin />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />}/>
          </Route>
          <Route path="/about" element={<About />} />
          {/* <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route> */}
          </Routes>
    </main>
    <Footer />


    </BrowserRouter>
  )
}

export default App