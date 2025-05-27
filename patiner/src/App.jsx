import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/SideBar';
import MapPage from './Pages/MapPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/Map" element={<MapPage />} />
            <Route path='/' element={<HomePage/>}/>
            <Route path='/Login' element={<LoginPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
