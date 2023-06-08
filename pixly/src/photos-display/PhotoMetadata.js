import React from "react";

/** PhotoMetadata displays the metadata for a given photo.
 *
 * Prop:
 * - photo: object, like { id, caption, aws_s3, exif_data }, where
 *          exif_data is an object
 *
 * { PhotoDetail } => PhotoMetadata
*/

function PhotoMetadata({ photo }) {
  const exifKeys = Object.keys(photo.exif_data);

  return (
    <div className="PhotoMetadata">
      <h3>Meta-data</h3>
      {exifKeys.length === 0
        ? <p>No meta-data found for this image.</p>
        : <ul>
          {exifKeys.map(key => (
            <li key={key}>
              <b>{key}:</b> {photo.exif_data[key]}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default PhotoMetadata;
