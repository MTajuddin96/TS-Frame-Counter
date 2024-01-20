import express from 'express';
import { uploadFile } from './files.handlers';
import fileUpload from 'express-fileupload'
import fileExists from '../middlewares/fileExist';
import sizeLimiter from '../middlewares/fileSize';
import fileExt from '../middlewares/fileExt';

export default (path: string, router: express.Router) => {
  router.post(`/${path}/upload-file`, fileUpload({ createParentPath: true }), fileExists, sizeLimiter, fileExt(['.mp3']), uploadFile)
}