import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomePage2 from '../pages/HomePage2'
import Recruitment from '../pages/RecruitmentPages'
import Achievements from '../pages/AchievementPages'
import JobDetails from '../pages/jobDetails'


const AllRoutes = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<HomePage2/>}/>
          <Route path='/recruitment' element={<Recruitment/>}/>
          <Route path='/achievements' element={<Achievements/>}/>
          <Route path="/recruitment/:id" element={<JobDetails />} />
        </Routes>
    </>
  )
}

export default AllRoutes