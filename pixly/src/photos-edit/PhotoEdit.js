import React, { useContext, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import photosContext from "../photosContext";
import PixlyApi from "../api";
import { formatCaption } from "../photos";

import PhotoImage from "../photos-display/PhotoImage";

/** Renders the edit page for a single photo. Displays photo image, buttons for
 * different edits, form to edit photo caption, and allows user to download the
 * photo.
 *
 * Routed at /edit/:photo_id
 *
 * RoutesList -> PhotoEdit
 */

function PhotoEdit() {
  const { photo_id } = useParams();
  const { photosData, setPhotosData } = useContext(photosContext);

  const [foundPhoto, setFoundPhoto] = useState({ data: null, isLoading: true });
  const [editingCaption, setEditingCaption] = useState(false);
  const [newCaption, setNewCaption] = useState("");

  /** Call backend method to find requested photo with photo_id. */
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await PixlyApi.getPhoto(photo_id);
        setFoundPhoto({ data: response, isLoading: false });
      } catch (error) {
        return <Navigate to="/photos" />;
      }
    };

    fetchPhoto();
  }, [photo_id]);

  function handleCaptionClick(evt) {
    setEditingCaption(true);
  }

  function handleCaptionChange(evt) {
    setNewCaption(evt.target.value);
  }

  /** Updates caption when input field "loses focus" (user clicks out).
   *
   * Calls a backend route to update image,
  */
  async function handleCaptionBlur() {
    const updatedPhoto = await PixlyApi.updatePhoto(photo_id, { "caption": newCaption });
    const newPhotoState = {
      data: [...photosData, updatedPhoto],
      isLoading: true
    };
    setPhotosData(newPhotoState);
    setEditingCaption(false);
  }

  if (foundPhoto.isLoading) return (<div>Is loading...</div>);

  return (
    <div className="PhotoEdit">
      <h1>Edit this photo!</h1>
      {
        editingCaption
          ? <input
            type="text"
            value={newCaption}
            onChange={handleCaptionChange}
            onBlur={handleCaptionBlur}
            autoFocus
          />
          : <h1 onClick={handleCaptionClick}>
            {formatCaption(foundPhoto.data.caption)}
          </h1>
      }
      <p>Click on the image heading to edit.</p>

      <PhotoImage photo={foundPhoto.data} />
    </div>
  );
}

export default PhotoEdit;
