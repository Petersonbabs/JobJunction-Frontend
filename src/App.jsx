import React, { useState } from 'react'
import { Router, Route, Routes, useLocation } from "react-router-dom"

// contexts


// public pages
import Home from "./pages/public-pages/Home";
import About from "./pages/public-pages/About-us";
import ContactUs from "./pages/public-pages/ContactUs";
import Jobs from "./pages/public-pages/Jobs";
import SingleJob from "./pages/public-pages/SingleJob";
import Companies from "./pages/public-pages/Companies";
import SingleCompany from "./pages/public-pages/SingleCompany";
import Categories from "./pages/public-pages/Categories";
import Login from "./pages/public-pages/Login";
import Signup from "./pages/public-pages/Signup";

// PUBLIC PAGES
import Dashboard from "./pages/private-pages/Dashboard";
import Editprofile from "./pages/private-pages/Editprofile";
import Editjob from "./pages/private-pages/Editjob";
import Apply from "./pages/private-pages/Apply";
import Postjob from "./pages/private-pages/Postjob";
import Applications from "./pages/private-pages/Applications";


// Error page
import NotFound from "./pages/404/NotFound"

// Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CategoryProvider from './contexts/CategoryContext';
import JobProvider from './contexts/JobContext';
import EmployeeProvider from './contexts/EmployeeContext';
import Employees from './pages/public-pages/Employees';
import ProtectedRoute from './pages/private-pages/ProtectedRoute';
import Popup from './components/Popup';
import MessageProvider from './contexts/MessageContext';
import AuthProvider from './contexts/AuthContext';
import IsCompany from "./pages/private-pages/IsCompany"
import ScrollToTop from './contexts/ScrollToTop';
import SingleEmployee from './pages/public-pages/SingleEmployee';
import IsEmployee from "./pages/private-pages/IsEmployee"
// import Nav from './components/Nav';
import VerticalNav from './components/VerticalNav';
import { ToastContainer } from 'react-toastify';



// localStorage.clear()

const App = () => {
  
  const location = useLocation()
  const isDashboardPage =  location.pathname.startsWith('/dashboard');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const displayPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  // const closePopup = () => {
  //   setShowPopup(false);
  // };

  // const verticalNav = document.querySelector(".verticalNav")
  // const navBackdrop = document.querySelector(".navBackdrop")
  // // navBackdrop.classList.add(".ll")
  

  // const openNav = (e) => {
  //   if (!verticalNav.contains(e.target)) {
  //     setIsOpen(!isOpen)
  //   }
  // }

  // const closeNav = (e) => {

  // }

  return (
    <AuthProvider>
      <EmployeeProvider>
        <CategoryProvider>
          <Navbar />
          {/* <Nav openNav={()=>{setIsOpen(!isOpen)}}/> */}
          <VerticalNav isOpen={isOpen} setIsOpen={setIsOpen} />
          <ToastContainer />
          <ScrollToTop />
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path='/' element={<Home />}></Route>
            <Route path='/about-us' element={<About />}></Route>
            <Route path='/contact-us' element={<ContactUs />}></Route>
            <Route path='/jobs/*' element={<Jobs />}></Route>
            <Route path='/job/:id' element={<SingleJob />}></Route>
            <Route path='/companies' element={<Companies />}></Route>
            <Route path='/company/:id' element={<SingleCompany />}></Route>
            <Route path='/employees' element={<Employees />}></Route>
            <Route path='/employee/:id' element={<SingleEmployee />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/categories' element={<Categories />}></Route>


            {/* PRIVATE ROUTES */}
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard/*' element={<Dashboard />}>
              </Route>

              <Route element={<IsEmployee />}>
                <Route path='/job/:id/apply' element={<Apply />}></Route>
              </Route>

            </Route>

            <Route path='*' element={<NotFound />}></Route>
          </Routes>

          {<Popup />}

          {!isDashboardPage && <Footer />}

        </CategoryProvider>
      </EmployeeProvider>
    </AuthProvider>

  )
}

export default App