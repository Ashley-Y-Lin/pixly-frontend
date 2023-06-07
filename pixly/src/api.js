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
     * [ { id, caption, aws_s3, exif_data }... ] */

  static async getPhotos() {
    let res = await this.request("photos");
    return res.photos;
  }

  /** addPhoto adds a photo to the system, takes as input JSON like
   * { caption, fileObject }
   *
   * Python in backend adds id, aws_link, and exif_data. Returns JSON like
   * { id, caption, aws_s3, exif_data }
  */

  static async addPhoto(formData) {
    let res = await this.request("photos", formData, "POST");
    return res.photo;
  }

}

export default PixlyApi;
