import React, { useState, useContext } from "react";
import PixlyApi from "../api";
import photosContext from "../photosContext";
import "./PhotosSearch.css";

import CaptionSearchForm from "./CaptionSearchForm";
import MetadataSearchForm from "./MetadataSearchForm";

/** Displays buttons that allow users to select a search form, and renders
 * the selected form, which allows users to filter displayedPhotos.
 *
 * Makes request to specific backend route on selected form submit, in order
 * to filter the photos correctly.
 *
 * State:
 * - searchOptionForm: search option selected, defaults to "caption"
 *
 * { PhotoList, EditPhotosList } -> PhotosSearch
 */

function PhotosSearch() {
  const { photosData, setPhotosData } = useContext(photosContext);
  const [searchOption, setSearchOption] = useState("caption");

  /** Triggered by CaptionSearchForm submit; updates displayedPhotos (array of
   * photo objects) in parent. */

  async function handleCaptionSearch(searchTerm) {
    const filteredPhotos = await PixlyApi.searchCaption(searchTerm);
    const newPhotoState = {
      data: [...filteredPhotos],
      isLoading: false
    };
    setPhotosData(newPhotoState);
  }

  /** Triggered by MetadataSearchForm submit; updates displayedPhotos (array of
   * photo objects) in parent. */

  async function handleMetadataSearch(formData) {
    const filteredPhotos = await PixlyApi.searchMetadata(formData);
    const newPhotoState = {
      data: [...filteredPhotos],
      isLoading: false
    };
    setPhotosData(newPhotoState);
  }

  function handleResetSearch() {
    const resetPhotoState = {
      data: [...photosData],
      isLoading: true
    };
    setPhotosData(resetPhotoState);
  }

  /** Update searchOptionForm with selected search option */
  function handleChange(evt) {
    const { value } = evt.target;
    setSearchOption(value);
  }

  return (
    <div className="PhotosSearch">
      <form className="searchOptionForm">
        <label htmlFor="choose-search">Pick a search option:</label>
        <div>
          <select id="choose-search"
            name="searchOption"
            value={searchOption}
            onChange={handleChange}
            className="form-control form-control-sm d-inline-flex"
          >
            <option value={"caption"}>Caption Search</option>
            <option value={"advanced"}>Metadata Search</option>
          </select>
        </div>
      </form>

      {searchOption === "caption"
        ? <CaptionSearchForm
          searchCaptionsFor={handleCaptionSearch}
          handleResetSearch={handleResetSearch}
        />
        : <MetadataSearchForm
          searchMetadataFor={handleMetadataSearch}
          handleResetSearch={handleResetSearch}
        />
      }
    </div>
  );
}

export default PhotosSearch;
