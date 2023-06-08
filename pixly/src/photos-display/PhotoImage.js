import React from "react";
import "./PhotoImage.css"

/** PhotoImage displays the image for a given photo.
 *
 * Prop:
 * - photo: object, like { id, caption, aws_s3, exif_data }, where
 *          exif_data is an object
 *
 * { PhotosList, PhotoDetail } => PhotoImage
*/

function PhotoImage({ photo }) {
  return (
    <div className="PhotoImage">
      <div key={photo.id}>
        <img
          className="photoImage"
          src={`${photo.aws_s3}`}
          alt={`${photo.caption}`}
        ></img>
      </div>
    </div>
  );
}

export default PhotoImage;
