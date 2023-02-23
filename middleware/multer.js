import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { config } from "../config.js";

const creds = new aws.Credentials(config.s3.accessKeyId, config.s3.secretAccessKey);

aws.config.update({
  region: config.s3.region,
  credentials: creds,
});

// aws.Credentials({
//   accessKeyId: config.s3.accessKeyId,
//   secretAccessKey: config.s3.secretAccessKey,
//   region: config.s3.region,
// });

const s3 = new aws.S3();

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sponsorsimg",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
