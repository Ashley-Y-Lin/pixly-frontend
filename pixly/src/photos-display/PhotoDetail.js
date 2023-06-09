import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import PixlyApi from "../api";
import { formatCaption } from "../photos";

import PhotoMetadata from "./PhotoMetadata";
import photosContext from "../photosContext";
import PhotoImage from "./PhotoImage";

/** Displays the image and meta-data for a single photo.
 *
 * Routed at /photos/:photo_id
 *
 * { RoutesList, PhotosList } -> PhotoDetail
 */

function PhotoDetail() {
  const { photo_id } = useParams();
  const { photosData, setPhotosData } = useContext(photosContext);
  const navigate = useNavigate();

  const [foundPhoto, setFoundPhoto] = useState({ data: null, isLoading: true });

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

  /** Triggered by Delete Photo button click; removes photo from system. */
  async function deletePhoto() {
    const deletedPhoto = await PixlyApi.deletePhoto(foundPhoto.id);

    const updatedPhotosData = photosData.filter(photo => photo.id !== photo_id);

    setPhotosData({
      data: updatedPhotosData,
      isLoading: true
    });
    navigate("/photos");
  }

  if (foundPhoto.isLoading === true) return (<div>Is loading...</div>);

  return (
    <div className="PhotoDetail">
      <h1>{formatCaption(foundPhoto.data.caption)}</h1>

      <PhotoImage photo={foundPhoto.data} />
      <PhotoMetadata photo={foundPhoto.data} />

      <button onClick={deletePhoto}>Delete Photo</button>
      <Link to={`/edit/${foundPhoto.data.id}`}>
        <button>Edit Photo</button>
      </Link>

    </div>
  );
}

export default PhotoDetail;
