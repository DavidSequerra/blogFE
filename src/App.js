import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CurrentUserCtx from "./context/currentUser";

import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/Navbar";
import HomePageOut from "./pages/HomePageOut";
import ProfilePage from "./pages/ProfilePage";
import BlogsPage from "./pages/BlogsPage";
import FeedPage from "./pages/FeedPage";
import Infinitetest from "./components/Infinitetest";

import "./app.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div>
      <CurrentUserCtx.Provider value={{ currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Navbar />
          <div className="redimensionPage">
            <Routes>
              <Route path="/" element={<HomePageOut />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/feed/:blogId" element={<FeedPage />} />
              <Route path="/infinite" element={<Infinitetest/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </CurrentUserCtx.Provider>
    </div>
  );
}

export default App;
