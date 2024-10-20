const { minioClient } = require('../config/minio');
const fs = require('fs');

class MinioService {
  
  async uploadFile(file, folder) {
    const bucketName = 'movies';
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    const metaData = {
      'Content-Type': file.mimetype,
    };

    try {
      await minioClient.fPutObject(bucketName, fileName, file.path, metaData);
      return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
    } catch (error) {
      throw new Error(`Failed to upload file to MinIO: ${error.message}`);
    } finally {
      fs.unlink(file.path, (err) => {
        if (err) console.error(`Failed to delete temporary file: ${err}`);
      });
    }
  }
}

module.exports =  MinioService;