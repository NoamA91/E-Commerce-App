const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

})

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    cb(null, false);
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
});

module.exports = upload;
