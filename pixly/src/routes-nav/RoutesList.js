import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import PhotosList from "../photos-display/PhotosList";
import PhotoDetail from "../photos-display/PhotoDetail";
import AddPhoto from "../photos-add/AddPhoto";


/** Site-wide routes.
 *
 * Visiting a non-existent route navigates to the homepage.
 */

function RoutesList() {
  return (
    <div className="RoutesList pt-5">
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/photos" element={<PhotosList />}/>
        <Route path="/photos/:photo_id" element={<PhotoDetail />}/>
        <Route path="/add" element={<AddPhoto />}/>
        <Route path="*" element={<Navigate to="/" /> } />
      </Routes>
    </div>
  );
}

export default RoutesList;
