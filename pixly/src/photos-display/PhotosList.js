import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./PhotosList.css";

import PhotoImage from "./PhotoImage";
import photosContext from "../photosContext";
import PhotosSearch from "../photos-search/PhotosSearch";

/** Displays images for all photos on the site, and a form that
 * allows users to search images by caption.
 *
 * Routed at /photos
 *
 * RoutesList -> PhotosList
 */

function PhotosList() {
  const { photosData } = useContext(photosContext);

  //FIXME: at some point limit # photos to e.g. 50

  return (
    <div className="PhotosList">
      <h1>Check out all the photos!</h1>

      <p>Click for more information about a photo, or search for a specific one.</p>

      <PhotosSearch />

      {photosData.length === 0
        ? <p>No photos found.</p>
        : <div className="PhotosArea">
          {photosData.map(photo => (
            <div key={photo.id}>
              <Link to={`/photos/${photo.id}`}>
                <PhotoImage photo={photo} />
              </Link>
            </div>
          ))}
        </div>}

    </div>
  );
}

export default PhotosList;
