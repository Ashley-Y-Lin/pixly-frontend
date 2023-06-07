import React from "react"

/** Alert: displays error messages in form submission.
 *
 * { AddPhotoForm } => Alert
 */

function Alert({alertMsgs=[]}) {
  return (
    <div className="Alert alert alert-danger">
      {alertMsgs.map(msg => <p key={msg}>{msg}</p>)}
    </div>
  )
}

export default Alert