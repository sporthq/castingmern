import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'server/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + '=' + file.originalname);
	},
});

// specify file format that can be save
const maxSize = 10 * 1024 * 1024; // Przykładowy limit wagowy: 5 MB
function fileFilter(req, file, cb) {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'  ) {
		cb(null, true);
	} else {
		return cb(new Error(`Nie prawidłowy format zdjęcia! `));
	}
	
}

const upload = multer({ storage, fileFilter, limits: {fileSize: maxSize} });

export default upload;
