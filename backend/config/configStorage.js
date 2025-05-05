
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    callback,
  ) => {
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    callback(null, `${uuidv4()}.${extension}`);
  },
});

const fileFilter = (
  req,
  file,
  callback,
) => {
  if (!file.originalname?.match(/\.(jpg|jpeg|png)$/))
    return callback(
      new Error('Seul les images sont autorisé.'),
      false,
    );
  callback(null, true);
};

const configStorage = () => multer({ storage, fileFilter });

module.exports = configStorage;