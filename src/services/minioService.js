const Minio = require('minio');
const fs = require('fs');
const path = require("path");


class MinioService {
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT) || 9000,
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async uploadFile(file, bucketName) {
    console.log('Uploading file:', file);
  console.log('Bucket name:', bucketName);
    if (!file || !file.buffer || !bucketName) {
      throw new Error('File or bucket name is missing');
    }
  
    const fileName = `${Date.now()}-${file.originalname}`;
    const metaData = {
      'Content-Type': file.mimetype,
    };
  
    try {
      await this.minioClient.putObject(bucketName, fileName, file.buffer, file.size, metaData);
      return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
    } catch (error) {
      throw new Error(`Failed to upload file to MinIO: ${error.message}`);
    }
  }
  
  
  

  async getFileUrl(bucketName, fileName) {
    try {
      return await this.minioClient.presignedGetObject(bucketName, fileName, 24 * 60 * 60);
    } catch (error) {
      throw new Error(`Failed to get file URL: ${error.message}`);
    }
  }
}

module.exports = new MinioService();