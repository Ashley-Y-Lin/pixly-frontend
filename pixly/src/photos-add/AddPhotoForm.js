import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPhotoS3 } from "../aws";

import Success from "../common/Success";
import Alert from "../common/Alert";

/** Form that allows users to upload a JPG photo by choosing a file on
 * their computer, and add a caption. The photo and corresponding caption
 * then goes in the system.
 *
 * State:
 * - formData: {} that tracks current form data
 *
 * Props:
 * - addPhoto: function to call in parent
 *
 * AddPhoto -> AddPhotoForm
 */

function AddPhotoForm({ addPhoto }) {
  const navigate = useNavigate();
  const initialFormData = { caption: "", file: "" };
  const [formData, setFormData] = useState(initialFormData);

  const [successMsg, setSuccessMsg] = useState("");
  const [alertMsgs, setAlertMsgs] = useState([]);

  /** Tell parent to add photo to system */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("addPhoto form data", formData);

    const fileObject = document.getElementById("addPhotoForm-file").files[0];
    console.log("file object", fileObject);

    const filePath = await uploadPhotoS3(fileObject);
    console.log("s3 filePath", filePath)

    // let newPhotoData = {
    //   "caption": formData.caption,
    //   "aws_s3": filePath
    // };
    // console.log("newPhotoData", newPhotoData);

    // try {
    //   await addPhoto(formData);
    //   setSuccessMsg(`Photo ${formData.caption} was added!`);
    //   setFormData(initialFormData);
    //   navigate("/");
    // } catch (err) {
    //   setAlertMsgs(err);
    // }
  }

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  // checks a file was selected
  let noFile = formData.file === "" ? true : false;

  return (
    <div className="AddPhotoForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center justify-content-lg-start gx-0">

          <div className="col-8">
            <input
              id="addPhotoForm-file"
              name="file"
              type="file"
              accept="image/jpeg"
              className="form-control"
              placeholder="Choose a JPG file from your computer."
              value={formData.file}
              onChange={handleChange}
            />
          </div>

          <div className="col-8">
            <textarea
              id="addPhotoForm-description"
              name="caption"
              className="form-control"
              placeholder="Write a caption for your image."
              onChange={handleChange}
              value={formData.caption}
              aria-label="Caption"
            />
          </div>

          {successMsg.length > 0 && <Success successMsg={successMsg} />}
          {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs} />}

          <div className="col-auto">
            <button disabled={noFile} type="submit" className="btn btn-lg btn-primary">
              Add Photo!
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddPhotoForm;
