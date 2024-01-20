import express from 'express';
import filesRoutes from '../fileUpload/files.routes';

const router = express.Router();

export default (): express.Router => {
  filesRoutes('files', router);
  return router;
}