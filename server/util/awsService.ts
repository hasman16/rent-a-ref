/*import * as aws from 'aws-sdk';

export default new class AWSService {
  private S3_BUCKET;
  constructor() {
    this.S3_BUCKET = process.env.S3_BUCKET;
    aws.config.region = 'us-west-1';
  }

  sendPix() {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: this.S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    return new Promise(function(resolve, reject) {
      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
          return reject(err);
        }
        const returnData = {
          signedRequest: data,
          url: `https://${this.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        return resolve(JSON.stringify(returnData));
      });
    }).then((sendObject: any) => {
      return new Promise(function(resolve, reject) {
        s3.upload(sendObject, (err, returnData) => {
          if (err) {
            return reject(err);
          }
          return resolve(JSON.stringify(returnData));
        });
      });
    });
  }

}
*/