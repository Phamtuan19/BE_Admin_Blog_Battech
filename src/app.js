import dotenv from "dotenv";
import express from "express";
import routes from "./routers";
import { connectMongoDB } from "./database/connect";
import cookieParser from "cookie-parser";
const cors = require('cors');

dotenv.config();

const IP_ADDRESS = '192.168.3.161'; // Địa chỉ IP của máy tính

const app = express();
const PORT = process.env.PORT;

// Cấu hình CORS cho ứng dụng của bạn
app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: 'GET, POST, PUT, PATCH, DELETE',
    })
);

// Sử dụng cookie-parser middleware
app.use(cookieParser());

// connect db mongoDB server atlas
connectMongoDB(app);

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

// Middleware
// giới hạn kích thước tệp JSON được gửi đến tối đa là 50 megabytes (MB).
app.use(express.json({ limit: "50mb" }));

// Middleware
// phép ứng dụng Express.js xử lý dữ liệu gửi đến server dưới dạng dữ liệu gửi đi
//  trong các biểu mẫu HTML (application/x-www-form-urlencoded).
// giới hạn kích thước tệp JSON được gửi đến tối đa là 50 megabytes (MB).
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Route
routes.forEach((item) =>
    item.routes.forEach((route) =>
        app.use("/api" + item.prefix + route.path, route.route)
    )
);

app.listen(PORT, () => {
    console.log(`[SUCCESS] ::: Server is listening on port: ${process.env.PORT}`);
});
