import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import PhotoMetadata from "./PhotoMetadata";
import photosContext from "../photosContext";
import PhotoImage from "./PhotoImage";

/** Displays the image and meta-data for a single photo.
 *
 * Routed at /photos/:photo_id
 *
 * { RoutesList, PhotosList } -> PhotoDetail
 */

function PhotoDetail() {
  const { photo_id } = useParams();
  const { photosData } = useContext(photosContext);

  const foundPhoto = photosData.find(photo => photo.id === parseInt(photo_id));
  if (!foundPhoto) return <Navigate to="/photos" />;

  return (
    <div className="PhotoDetail">
      <h1>
        {foundPhoto.caption[0].toUpperCase() +
        foundPhoto.caption.slice(1).toLowerCase()}
      </h1>

      <PhotoImage photo={foundPhoto} />
      <PhotoMetadata photo={foundPhoto} />

    </div>
  );
}

export default PhotoDetail;
