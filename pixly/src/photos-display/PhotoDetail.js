import React, { useContext } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import PixlyApi from "../api";

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
  const { photosData, setPhotosData } = useContext(photosContext);
  const navigate = useNavigate();

  const foundPhoto = photosData.find(photo => photo.id === parseInt(photo_id));
  if (!foundPhoto) return <Navigate to="/photos" />;

  /** Triggered by Delete Photo button click; removes photo from system. */
  async function deletePhoto() {
    console.log("delete photo is triggered");

    const deletedPhoto = await PixlyApi.deletePhoto(foundPhoto.id);
    console.log("deleted photo filename", deletedPhoto);

    const updatedPhotosData = photosData.filter(photo => photo.id !== photo_id);
    console.log("updatedPhotosData", updatedPhotosData);

    setPhotosData({
      data: updatedPhotosData,
      isLoading: true
    });
    navigate("/photos");
  }

  return (
    <div className="PhotoDetail">
      <h1>
        {foundPhoto.caption[0].toUpperCase() +
          foundPhoto.caption.slice(1).toLowerCase()}
      </h1>

      <PhotoImage photo={foundPhoto} />
      <PhotoMetadata photo={foundPhoto} />

      <button onClick={deletePhoto}>Delete Photo</button>

    </div>
  );
}

export default PhotoDetail;
