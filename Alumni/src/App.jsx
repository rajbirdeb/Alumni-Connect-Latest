import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnnouncementPage from './components/AnnouncementPage';
import AdminAnnouncementForm from './components/AdminAnnouncementForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/announcements" element={<AnnouncementPage />} />
        <Route path="/admin/create" element={<AdminAnnouncementForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
