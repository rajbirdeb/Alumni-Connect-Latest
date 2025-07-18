import React from 'react';

const AnnouncementCard = ({ title, type, content, date }) => {
  return (
    <div className="border p-4 shadow-lg rounded-lg mb-4 bg-white">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm italic text-gray-600">{type}</p>
      <p className="mt-2">{content}</p>
      <p className="text-xs text-gray-400 mt-2">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
};

export default AnnouncementCard;
