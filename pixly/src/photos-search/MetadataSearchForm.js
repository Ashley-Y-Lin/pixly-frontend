import React, { useState } from "react";

/** Renders Metadata Search Form. Allows user to search for specific values
 * in the meta-data, and filters down photos based. Calls fn passed down by
 * parent, which resets photos state in App.
 *
 * Props:
 * - searchMetadataFor: fn from parent
 * - handleResetSearch: fn from parent, reset search
 *
 * PhotosList -> PhotosSearch -> AdvancedSearchForm
 */

function MetadataSearchForm({ searchMetadataFor, handleResetSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedSearch = searchTerm.replace(/\s/g, '');
    searchMetadataFor("metadata", trimmedSearch);
    setSearchTerm(trimmedSearch);
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="MetadataSearchForm mb-4">
      <form onSubmit={handleSubmit}>
        {/* <div>
          <p>Input search terms for specific metadata fields with name:value.</p>
          <ul>
            <li>Search for multiple fields by separating searches with a comma.</li>
            <li>Some common metadata fields include Make, Model, and DateTime.</li>
            <li><em>Example search: Make:Canon,Model:IXUS</em></li>
          </ul>
        </div> */}
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
            <button type="button" className="btn btn-lg btn-secondary" onClick={handleResetSearch}>
              Reset Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MetadataSearchForm;
