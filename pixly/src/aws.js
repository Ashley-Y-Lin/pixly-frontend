import AWS from 'aws-sdk/dist/aws-sdk-react-native';

const S3_BUCKET = 'pixly-ashleylin';
const REGION = 'us-east-1';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

/** uploadPhotoS3 uploads a photo to S3.
 *
 * It takes as input a file object, uploads the photo to an AWS S3 bucket called
 * pixly-ashleylin, and returns the public URL of uploaded file, served by AWS.
*/

function uploadPhotoS3(file) {
  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    ContentType: file.type,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); // return public URL of uploaded file
      }
    });
  });
}

export { uploadPhotoS3 };