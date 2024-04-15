import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UseJobContext } from '../../contexts/JobContext';
import { Typography } from '@mui/material';
import SinglePage from './SinglePage';
import moment from 'moment';
import IsLoading from '../../components/IsLoading';
import Default from "../../assets/default-job.jpg"

const SingleJob = () => {

  const { singleJob, getSingleJob } = UseJobContext()
  const [jobDate, setJobDate] = useState()
  const { id } = useParams()


  useEffect(() => {
    getSingleJob(id)
    if (singleJob) {
      setJobDate(moment(singleJob.createdAt).format("d mm yyyy"))
    }
  }, [singleJob])


  if(!singleJob){
    return <IsLoading />
  }



  return (
    <>

      {
        singleJob && (

          <SinglePage

            singleDoc={singleJob}
            pageImg={singleJob.company.featuredImg || Default}

            defaultImg={"https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"}

            pageTitle={singleJob.title}
            pageDetailOne={singleJob.category.title || "No category"}
            pageDetailTwo={singleJob.location}
            pageDetailThree={singleJob.salary}
            pageDetailFour={jobDate}
            pageTags={singleJob.jobType}
            pageAction={"Apply"}
            actionLink={`/job/${singleJob._id}/apply`}

            pageDescription={singleJob.description}
            secondList={singleJob.requirements}
            secondListTitle={"Skills & Experiences"}

            secondSideTitle={"Job Overview"}

          />
        )



      }

    </>
  )
}

export default SingleJob