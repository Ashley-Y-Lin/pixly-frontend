import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./PhotosList.css";

import PhotoImage from "./PhotoImage";
import photosContext from "../photosContext";

/** Displays images for all photos on the site, and a form that
 * allows users to search images by caption.
 *
 * Routed at /photos
 *
 * RoutesList -> PhotosList
 */

function PhotosList() {
  const { photosData } = useContext(photosContext);

  return (
    <div className="PhotosList">
      <h1>Check out all the photos!</h1>
      <p>Search for a photo and click for more information about it.</p>

      <div className="PhotosArea">{photosData.map(photo => (
        <div key={photo.id}>
          <Link to={`/photos/${photo.id}`}>
            <PhotoImage photo={photo} />
          </Link>
        </div>
      ))}</div>

    </div>
  );
}

export default PhotosList;
