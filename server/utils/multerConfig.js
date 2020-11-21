const multer = require('multer');
const path = require('path');

const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const name = path.basename(file.originalname);

    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
      cb(new Error('File type is not supported'), false);

      return;
    }

    cb(null, `${name.replace(/\s/g, '')}-${Date.now()}${extension}`);
  },
});

module.exports = multerConfig;
