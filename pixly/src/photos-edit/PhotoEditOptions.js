import React, { useState } from "react";
import PixlyApi from "../api";

import PhotoPreview from "./PhotoPreview";

/** Displays editing options for an image. Calls corresponding backend method
 * to do the actual editing. Displays mock edited photo side-by-side with current
 * photo, asks user if they want to save it (updates system) or download it.
 *
 * State:
 * - editingImage: boolean, whether user has clicked on button to edit image.
 * - photoPreviewURL: string, AWS S3 link to edited photo preview, passed to child.
 *
 * Prop:
 * - photoData: {id, caption, file_name, aws_s3, exif_data}
 *
 * PhotoEdit -> PhotoEditOptions -> PhotoPreview
 */

function PhotoEditOptions({ photoData }) {
  const [editingImage, setEditingImage] = useState(false);
  const [photoPreviewURL, setPhotoPreviewURL] = useState("");

  /** handle edit takes as input a string representing edit type,
   * corresponds with fn call on backend
   */
  async function handleEdit(editType) {
    const previewS3Link = await PixlyApi.createEditPreview(
      photoData.id,
      { photoData: photoData, editType: editType }
    );
    setPhotoPreviewURL(previewS3Link);
    setEditingImage(true);
  }

  return (
    <div className="PhotoEditOptions">
      <h3>Photo Edit Options</h3>
      <p>Preview the edited photo, and save or download.</p>

      <div className="PhotoEditButtons">
        <button onClick={() => handleEdit("blackAndWhite")}>
          Black & White
        </button>
        <button onClick={() => handleEdit("pixelate")}>
          Pixelate
        </button>
        <button onClick={() => handleEdit("scramble")}>
          Scramble
        </button>
      </div>

      {editingImage && <PhotoPreview photoPreviewURL={photoPreviewURL} />}
    </div>
  );
}

export default PhotoEditOptions;