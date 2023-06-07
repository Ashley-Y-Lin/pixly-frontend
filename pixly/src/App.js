import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import photosContext from "./photosContext";
import PixlyApi from "./api";

import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";


/** Pix.ly application.
 *
 * State
 * - photos: { data: [{ id, caption, aws_s3, exif_data }...], isLoading: boolean }
 *
 * App -> { Navigation, Routes }
 */


function App() {
  const [photos, setPhotos] = useState({
    data: {},
    isLoading: true
  });

  async function loadPhotos() {
    const response = await PixlyApi.getPhotos();
    setPhotos({
      data: response.data,
      isLoading: false
    });
  }

  if (photos.isLoading) {
    loadPhotos();
    return <h1>Loading...</h1>;
  }

  return (
    <photosContext.Provider value={{ photosData: photos }}>
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <RoutesList />
        </div>
      </BrowserRouter>
    </photosContext.Provider>

  );
}

export default App;
