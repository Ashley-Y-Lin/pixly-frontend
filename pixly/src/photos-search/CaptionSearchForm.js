import React, { useState } from "react";

/** Renders Caption Search Form. Allows user to enter phrase, that filters down
 * photo based on caption. Calls fn passed down by parent, which resets
 * displayedPhotos state in PhotosList or EditPhotosList.
 *
 * Props:
 * - searchCaptionsFor: fn from parent
 *
 * { PhotosList, EditPhotosList } -> PhotosSearch -> SearchForm
 */

function CaptionSearchForm({ searchCaptionsFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchCaptionsFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center justify-content-lg-start gx-0">
          <div className="col-8">
            <input
              className="form-control form-control-lg"
              name="searchTerm"
              placeholder="Enter search term."
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-lg btn-primary">
              Search!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CaptionSearchForm;
