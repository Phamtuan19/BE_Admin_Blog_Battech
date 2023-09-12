const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const webp = require("webp-converter");

cloudinary.config({
    cloud_name: 'dizwixa7c',
    api_key: '672996278691988',
    api_secret: 'Ol-ENDbI34NI0wQyB8NVL_gAxGw'
});

// Cấu hình lưu trữ Cloudinary:
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// Kiểm tra loại tệp và chuyển đổi thành định dạng WebP:

// tạo một hàm checkFileType để kiểm tra loại tệp được tải lên và 
// chuyển đổi nó thành định dạng WebP nếu loại tệp là image/jpeg. 
// Điều này đảm bảo rằng chỉ các hình ảnh JPEG mới được chuyển đổi thành WebP.
// const checkFileType = (file, cb) => {
//     const requireMimetype = "image/jpeg";
//     const checkMimeType = file.mimetype == requireMimetype ? true : false;
//     if (checkMimeType) {
//         webp.cwebp(file.originalname, "output.webp", "-q 80", function (status) {
//         });
//         return cb(null, true)
//     } else {
//         cb("Error:Only jpg images are allowed.")
//     }
// }

// Cấu hình multer và upload hình ảnh:
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(req.body.file, cb);
    },
}).single("image");


const fileUploader = multer({ storage });
export { fileUploader, upload, cloudinary };
