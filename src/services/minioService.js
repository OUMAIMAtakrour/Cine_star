const { minioClient } = require("../config/minio");
const path = require("path");
const fs = require("fs");

class MinioService {
  async uploadFileToMinIO(file) {
    const metaData = {
      "Content-Type": file.mimetype,
    };

    const fileName = Date.now() + path.extname(file.originalname);

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      fileStream.on("error", (err) => {
        console.error("File stream error:", err);
        return reject(err);
      });

      minioClient.putObject("movies", fileName, fileStream, metaData, (err) => {
        if (err) {
          console.error("MinIO upload error:", err);
          return reject(err);
        }
        const fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/movies/${fileName}`; 
        resolve(fileUrl);
      });
    });
  }

  async uploadVideo(file) {
    try {
      const result = await this.uploadFileToMinIO(file); 
      return result; 
    } catch (error) {
      throw new Error(`Failed to upload video: ${error.message}`);
    }
  }

  async getFileUrl(fileName, bucketName = "movies") {
    try {
      const url = await minioClient.presignedGetObject(
        bucketName,
        fileName,
        24 * 60 * 60
      );
      return url;
    } catch (error) {
      throw new Error(`Failed to get file URL: ${error.message}`);
    }
  }
}

module.exports = new MinioService();
