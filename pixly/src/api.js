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

  /** getPhoto returns a single photo in the system, like
     * { id, caption, file_name, aws_s3, exif_data } */

  static async getPhoto(photoId) {
    let res = await this.request(`photos/${photoId}`);
    return res.photo;
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

  /** updatePhoto updates a photo in the system.
   *
   * Takes as input JSON like {"caption": string}
   *
   * Returns updated photo object in JSON,
   *  like {id, caption, file_name, aws_s3, exif_data}
   */

  static async updatePhoto(photoId, newCaption) {
    let res = await this.request(`photos/${photoId}`, newCaption, "PATCH");
    return res.photo;
  }

  /** deletePhoto removes a photo from the system. */

  static async deletePhoto(photoId) {
    let res = await this.request(`photos/${photoId}`, {}, "DELETE");
    return res.deleted;
  }

  /** searchPhoto takes as input a type (string, "caption" or "exif_data") and
   * a searchTerm (string). It returns all photos with either a caption or
   * exif_data as specified in the searchTerm.
   *
   * For exif_data, the search term is a formatted string like 'Make:Canon,Model:400'.
   *
   * It returns a list of photo objects, like
   * [ { id, caption, file_name, aws_s3, exif_data }... ]
  */

  static async searchPhoto(type, searchTerm) {
    let res = await this.request(`photos/search-${type}/${searchTerm}`);
    return res.photos;
  }

  /** createEditPreview edits a photo, and saves a preview of edited photo
   * image in AWS S3. Returns the AWS S3 URL.
   *
   * editType (param) is a string like "pixelate" or "blackAndWhite"
   *
   * Python in backend adds id, aws_link, and exif_data. Returns JSON like
   * { id, caption, file_name, aws_s3, exif_data }
  */

  static async createEditPreview(photoId, editType) {
    let res = await this.request(`photos/edit/${photoId}/${editType}`, {}, "POST");
    return res.editedPhotoURL;
  }

}

export default PixlyApi;
