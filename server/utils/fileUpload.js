import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'server/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + "=" +  file.originalname);
	},
});

console.log(storage);
// specify file format that can be save

function fileFilter(req, file, cb) {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({ storage, fileFilter });

export default upload
