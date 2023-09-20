// import express from "express";
// // import morgan from "morgan";
// // import dotenv from "dotenv";
// import routes from "./routers";
// import cors from "cors";
// import { connectMongoDB } from "./database/connect";
// import cookieParser from "cookie-parser";


// const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
console.log(CLIENT_URL)
// // Sử dụng cookie-parser middleware
// app.use(cookieParser());

// // sử dụng cors để ngăn chặn các URL không được cấu hình call Api
// // app.use(cors()); // middleware CORS

// app.use(
//     cors({
//         origin: 'https://admin-blog-battech.vercel.app/', // URL Client được phép call Api
//         /*
//         * credentials: true: Thông qua tùy chọn này, 
//         * bạn cho biết rằng yêu cầu từ trình duyệt có thể bao gồm các thông tin xác thực (credentials) 
//         * như cookie hoặc thông tin xác thực HTTP. Bạn cần đảm bảo rằng cả ứng dụng server và client đều 
//         * đã được cấu hình để sử dụng withCredentials (nếu bạn sử dụng Axios hoặc XMLHttpRequest) 
//         * hoặc credentials: 'include' (nếu bạn sử dụng Fetch API) để xử lý các thông tin xác thực này.
//         */
//         // origin: "*",
//         credentials: true,
//         methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
//         preflightContinue: true,
//         optionSuccessStatus: 200,
//     })
// );



// // connect db mongoDB server atlas
// connectMongoDB(app);

// // middleware tùy chỉnh trong Express.js. 
// // Middleware này được áp dụng cho tất cả các yêu cầu được gửi đến server.
// app.use(function (req, res, next) {
//     /*
//     * Dòng này thiết lập tiêu đề "Access-Control-Allow-Origin" trong phản hồi HTTP. 
//     * Tiêu đề này cho biết các trang web từ bất kỳ nguồn (origin) nào ("*") 
//     * đều được phép gửi yêu cầu CORS đến ứng dụng server của bạn. 
//     * Điều này thường được sử dụng trong giai đoạn phát triển và 
//     * không nên được sử dụng trong môi trường sản xuất. 
//     */
//     res.header("Access-Control-Allow-Origin", CLIENT_URL);
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");

//     /*
//     * Dòng này thiết lập tiêu đề "Access-Control-Allow-Headers" trong phản hồi HTTP. 
//     * Tiêu đề này chỉ định các tiêu đề HTTP được phép trong yêu cầu CORS. 
//     * Trong trường hợp này, các tiêu đề "Origin," "X-Requested-With," 
//     * "Content-Type," và "Accept" được cho phép.
//     */
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );

//     // Dòng này chuyển quyền điều khiển đến middleware tiếp theo
//     next();
// });

// // Middleware
// // giới hạn kích thước tệp JSON được gửi đến tối đa là 50 megabytes (MB). 
// app.use(express.json({ limit: "50mb" }));

// // Middleware
// // phép ứng dụng Express.js xử lý dữ liệu gửi đến server dưới dạng dữ liệu gửi đi
// //  trong các biểu mẫu HTML (application/x-www-form-urlencoded). 
// // giới hạn kích thước tệp JSON được gửi đến tối đa là 50 megabytes (MB). 
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// // Route
// routes.forEach((item) =>
//     item.routes.forEach((route) =>
//         app.use("/api" + item.prefix + route.path, route.route)
//     )
// );

// app.listen(PORT || 5000, () => {
//     console.log(`[SUCCESS] ::: Server is listening on port: ${PORT}`);
// });
import express from "express";
import routes from "./routers";
import { connectMongoDB } from "./database/connect";
import cookieParser from "cookie-parser";
const cors = require('cors');
// app.use(cors());
const app = express();

app.use(cors({
    origin: 'https://admin-blog-battech.vercel.app',
    credentials: true, // Nếu cần truy cập cookie
}));

// Sử dụng cookie-parser middleware
app.use(cookieParser());

// connect db mongoDB server atlas
connectMongoDB(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
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



app.listen(process.env.PORT || 5000, () => {
    console.log(`[SUCCESS] ::: Server is listening on port: ${process.env.PORT}`);
});
