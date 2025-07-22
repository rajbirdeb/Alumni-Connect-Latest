import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home2 from "../pages/Home2";
import RecruitmentList from "../pages/RecruitmentList";
import PostRecruitment from "../pages/PostRecruitment";
import AchievementList from "../pages/AchievementList";
import PostAchievement from "../pages/PostAchievement";
import Home from "./Homepage";
import Login from "./Login";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import CreateEvent from "./CreateEvent";
import ViewEvents from "./ViewEvent";
import ViewAlumini from "./ViewAlumini";
import EditProfile from "./EditProfile";
import About from "./About";
import Sidebar from "./Sidebar";
import AnnouncementPage from './AnnouncementPage';
import AdminAnnouncementForm from './AdminAnnouncementForm';

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruitments" element={<RecruitmentList />} />
        <Route path="/post-recruitment" element={<PostRecruitment />} />
        <Route path="/achievements" element={<AchievementList />} />
        <Route path="/post-achievement" element={<PostAchievement />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/view-alumni" element={<ViewAlumini />} />{" "}
        {/* Corrected path */}
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/announcements" element={<AnnouncementPage />} />
        <Route path="/admin/create" element={<AdminAnnouncementForm />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
