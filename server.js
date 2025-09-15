import express from "express";
import AWS from "aws-sdk";
import cors from "cors";

const app = express();
app.use(cors());

const s3 = new AWS.S3({
  region: "eu-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const bucketName = "snareshare"; // ✅ update with your bucket name

// Endpoint: get presigned URLs
app.get("/api/get-presigned-url", async (req, res) => {
  const { filename } = req.query;

const uploadUrl = s3.getSignedUrl("putObject", {
  Bucket: bucketName,
  Key: filename,
  Expires: 3600,
  ContentType: file.mimetype || "application/octet-stream" // 👈 important
});

  const downloadUrl = s3.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: filename,
    Expires: 3600,
  });

  res.json({ uploadUrl, downloadUrl });
});

app.listen(3001, () =>
  console.log("✅ SnareShare backend running on http://localhost:3001")
);
