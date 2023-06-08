import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001/api";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class PixlyApi {

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** getPhotos returns all photos in the system, like
     * [ { id, caption, file_name, aws_s3, exif_data }... ] */

  static async getPhotos() {
    let res = await this.request("photos");
    return res.photos;
  }

  /** addPhoto adds a photo to the system, takes as input JSON like
   * { caption, fileObject }
   *
   * Python in backend adds id, aws_link, and exif_data. Returns JSON like
   * { id, caption, file_name, aws_s3, exif_data }
  */

  static async addPhoto(formData) {
    let res = await this.request("photos", formData, "POST");
    return res.photo;
  }

  /** deletePhoto removes a photo from the system. */

  static async deletePhoto(photoId) {
    let res = await this.request(`photos/${photoId}`, {}, "DELETE");
    return res.deleted;
  }

  /** searchCaption returns all photos with a caption that includes the query.
   *
   * It returns a list of photo objects, like
   * [ { id, caption, file_name, aws_s3, exif_data }... ]
  */

  static async searchCaption(searchTerm) {
    let res = await this.request(`photos/search/${searchTerm}`);
    return res.photos;
  }

}

export default PixlyApi;
