import React from "react";

/** PhotoPreview displays edited version of image. Has buttons that allows
 * users to save edited image to system, or just download it.
 *
 * Prop:
 * - photoPreviewURL: AWS S3 link to the preview of edited photo image
 *
 * PhotoEdit -> PhotoEditOptions -> PhotoPreview
 */

//TODO: at some point, store edited image preview as a tempfile for performance
// and scalability reasons

function PhotoPreview({ photoPreviewURL }) {

  return (
    <div className="PhotoPreview">
      <img
        className="previewImage"
        src={photoPreviewURL}
        alt="preview"
      ></img>
    </div>
  );

}

export default PhotoPreview;
