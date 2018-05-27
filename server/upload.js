const multer = require('multer')

//image upload
const storage = multer.diskStorage({
  destination: 'user-uploads',
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now() + '.jpg');
  }
});

const upload = multer({ storage: storage })

module.exports = upload