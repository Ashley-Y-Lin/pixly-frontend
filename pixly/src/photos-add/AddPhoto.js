import React, { useContext } from "react";
import PixlyApi from "../api";
import photosContext from "../photosContext";

import AddPhotoForm from "./AddPhotoForm";
import "./AddPhoto.css";

/** Displays form for users to add a photo to site.
 *
 * Routed at /add
 *
 * RoutesList -> AddPhoto -> AddPhotoForm
 */

function AddPhoto() {
  const { photosData, setPhotosData } = useContext(photosContext);

  /** Triggered by AddPhotoForm submit; adds photo to system. */
  async function addPhoto(formData) {
    const newPhoto = await PixlyApi.addPhoto(formData);
    const newPhotoState = {
      data: [...photosData, { ...newPhoto }],
      isLoading: true
    };
    setPhotosData(newPhotoState);
  }

  return (
    <div className="AddPhoto">
      <h1>Add a photo to Pix.ly</h1>

      <div className="AddPhotosArea">
        <div>
          <h3>Upload a photo!</h3>
          <AddPhotoForm addPhoto={addPhoto} />
        </div>

        <div>
          <h3>Quick upload.</h3>
          <button>Add 10 photos from NASA!</button>
        </div>
      </div>

    </div>
  );
}

export default AddPhoto;
