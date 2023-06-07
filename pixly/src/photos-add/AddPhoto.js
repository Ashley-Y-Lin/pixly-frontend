import React, { useContext } from "react";
import PixlyApi from "../api";
import photosContext from "../photosContext";

import AddPhotoForm from "./AddPhotoForm";

/** Displays form for users to add a photo to site.
 *
 * Routed at /add
 *
 * Props:
 * - addPhoto: function from parent, passed to AddPhotoForm
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
    }
    setPhotosData(newPhotoState);
  }

  return (
    <div className="AddPhoto">
      <h1>Add a photo to Pix.ly!</h1>
      <AddPhotoForm addPhoto={addPhoto} />
    </div>
  );
}

export default AddPhoto;
