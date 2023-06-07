import React from "react"

/** Success: displays success message in form submission.
 *
 * { AddPhotoForm } => Success
 */

function Success({successMsg=""}) {
  return (
    <div className="Success alert alert-success">
      <p>{successMsg}</p>
    </div>
  )
}

export default Success