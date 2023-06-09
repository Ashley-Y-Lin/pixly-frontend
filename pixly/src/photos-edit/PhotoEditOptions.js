import React, { useState } from "react";
import PixlyApi from "../api";

import PhotoPreview from "./PhotoPreview";
import "./PhotoEditOptions.css";

/** Displays editing options for an image. Calls corresponding backend method
 * to do the actual editing. Displays mock edited photo side-by-side with current
 * photo, asks user if they want to save it (updates system) or download it.
 *
 * State:
 * - editingImage: boolean, whether user has clicked on button to edit image.
 * - previewData: { id, file_name, aws_s3, exif_data }, passed to child.
 *
 * Prop:
 * - photoData: {id, caption, file_name, aws_s3, exif_data}
 *
 * PhotoEdit -> PhotoEditOptions -> PhotoPreview
 */

function PhotoEditOptions({ photoData }) {
  const [editingImage, setEditingImage] = useState(false);
  const [previewData, setPreviewData] = useState({});

  /** handle edit takes as input a string representing edit type,
   * corresponds with fn call on backend
   */
  async function handleEdit(editType) {
    const previewData = await PixlyApi.createEditPreview(
      photoData.id, editType
    );
    setPreviewData({ ...previewData, "id": photoData.id });
    setEditingImage(true);
  }

  //FIXME: when you click on two edit options right after the other (without
  //saving or downloading), the preview photo isn't updated.

  return (
    <div className="PhotoEditOptions">
      <h3>Photo Edit Options</h3>
      <p>Preview the edited photo, and save or download.</p>

      <div className="PhotoEditButtons">
        <button onClick={() => handleEdit("blackAndWhite")}>
          Black & White
        </button>
        <button onClick={() => handleEdit("addBorder")}>
          Add Border
        </button>
        <button onClick={() => handleEdit("invertColors")}>
          Invert Colors
        </button>
        <button onClick={() => handleEdit("sketch")}>
          Sketch
        </button>
      </div>

      {editingImage && <PhotoPreview previewData={previewData} />}
    </div>
  );
}

export default PhotoEditOptions;
