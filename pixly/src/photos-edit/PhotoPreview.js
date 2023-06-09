import React, { useContext } from "react";
import PixlyApi from "../api";
import photosContext from "../photosContext";

/** PhotoPreview displays edited version of image. Has buttons that allows
 * users to save edited image to system, or just download it.
 *
 * Prop:
 * - previewData: { id, file_name, aws_s3, exif_data }
 *
 * PhotoEdit -> PhotoEditOptions -> PhotoPreview
 */

//TODO: at some point, store edited image preview as a tempfile for performance
// and scalability reasons

function PhotoPreview({ previewData }) {
  const { photosData, setPhotosData } = useContext(photosContext);

  /** handleSave updates the image in system with photoPreviewURL, and resets
   * the photos state in context, so it's updated across the application.
   */
  async function handleSave() {
    const updatedPhoto = await PixlyApi.updatePhoto(
      previewData.id,
      {
        "file_name": previewData.file_name,
        "aws_s3": previewData.aws_s3,
        "exif_data": previewData.exif_data
      }
    );
    const newPhotoState = {
      data: [...photosData, updatedPhoto],
      isLoading: true
    };
    setPhotosData(newPhotoState);
    // call patch function
    // should remove preview link from AWS
    // call setPhotosData
  }

  /** handleDownload allows the user to download preview image onto their
   * local machine.
   */
  function handleDownload() {
    fetch(previewData.aws_s3)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = previewData.file_name;

        link.click();

        URL.revokeObjectURL(link.href);
      });
  }

  return (
    <div className="PhotoPreview">

      <img
        className="previewImage"
        src={previewData.aws_s3}
        alt="preview"
      ></img>

      <div className="photoUpdateButtons">
        <button onClick={handleSave}>Save Image</button>
        <button onClick={handleDownload}>Download Image</button>
      </div>
    </div>
  );

}

export default PhotoPreview;
