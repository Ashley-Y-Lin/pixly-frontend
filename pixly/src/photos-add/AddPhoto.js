import React, { useState } from "react";
import PixlyApi from "../api";

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

  /** Triggered by AddPhotoForm submit; adds photo to system. */
  async function addPhoto(formData) {
    let photo = await PixlyApi.addPhoto(formData);
  }

  return (
    <div className="AddPhoto">
      <h1>Add a photo to Pix.ly!</h1>
      <AddPhotoForm addPhoto={addPhoto} />
    </div>
  );
}

export default AddPhoto;
