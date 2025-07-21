import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home2 from '../pages/Home2'
import RecruitmentList from '../pages/RecruitmentList'
import PostRecruitment from '../pages/PostRecruitment'
import AchievementList from '../pages/AchievementList'
import PostAchievement from '../pages/PostAchievement'
import Sidebar from '../components/Sidebar'

const AllRoutes = () => {
  return (
    <>
        <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/recruitments" element={<RecruitmentList />} />
        <Route path="/post-recruitment" element={<PostRecruitment />} />
        <Route path="/achievements" element={<AchievementList />} />
        <Route path="/post-achievement" element={<PostAchievement />} />
        <Route path="/sidebar" element={<Sidebar/>}/>
      </Routes>
    </>
  )
}

export default AllRoutes