import React from 'react'
import UseAuthContext from "../../contexts/AuthContext"
import IsLoading from "../../components/IsLoading"
import { BadgeOutlined, WorkOutline } from '@mui/icons-material'

const DashboardIndex = () => {

  // const {} = UseAuthContext()

  // if(isLoading) {
  //   return <IsLoading />
  // }


  return (
    <div className='dashboardIndex'>
      <h3>Applications statistics</h3>
      <div>
        <div>
          <span>
            <WorkOutline />
          </span>
          <h2>1</h2>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default DashboardIndex