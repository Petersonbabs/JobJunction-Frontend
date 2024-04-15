import React, { useEffect, useState } from 'react'
import { UseAuthContext } from '../../contexts/AuthContext';
import "../../style/dashboard.css"
import DasboardNav from './DasboardNav';
import DashboardIndex from '../private-pages/DashboardIndex';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "../private-pages/ProtectedRoute"
import MyJobs from './MyJobs';
import Postjob from './Postjob';
import Editprofile from './Editprofile';
import Applications from './Applications';
import SmallDashboardNav from './SmallDashboardNav';
import IsCompany from "../private-pages/IsCompany"
import Editjob from './Editjob';
import DashboardDefault from './DashboardDefault';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {

  const { user, warningMessage, errorMessage, setErrorMessage, setWarningMessage } = UseAuthContext();


  // useEffect(() => {
  //   // if (errorMessage) {
  //     toast.warning(errorMessage);
  //   // }
  // }, [errorMessage]);

  


  return (
    <div className='dashboard'>
      <ToastContainer />
      <DasboardNav display={user.role == "company" ? "block" : "none"} applicationText={user.role == "company" ? "Applications" : "Applied jobs"}/>
      {/* <SmallDashboardNav navShown={true} display={user.role == "company" ? "block" : "none"}/> */}

      <div className="dashboard-pages">
        <div className="container">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<DashboardDefault />}></Route>
              <Route element={<IsCompany />}>
                
                <Route path='/edit-job/:id' element={<Editjob />}></Route>
               
                <Route path='/my-jobs' element={<MyJobs />}>
                
                </Route>
                <Route path='/post-job' element={<Postjob />}></Route>
              
              </Route>

              <Route path='/edit-profile/:id' element={<Editprofile />}></Route>

              <Route path='/applications' element={<Applications />}></Route>

            </Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard