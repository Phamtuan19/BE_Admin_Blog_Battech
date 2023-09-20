
import dotenv from "dotenv";
import express from "express";
import routes from "./routers";
import { connectMongoDB } from "./database/connect";
import cookieParser from "cookie-parser";
const cors = require('cors');

dotenv.config();



const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors());
// Sử dụng cookie-parser middleware
app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true, // Nếu cần truy cập cookie
    optionSuccessStatus: 200,
}));

// connect db mongoDB server atlas
connectMongoDB(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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

app.listen(PORT || 5000, () => {
    console.log(`[SUCCESS] ::: Server is listening on port: ${process.env.PORT}`);
});
