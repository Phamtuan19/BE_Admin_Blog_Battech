
import jwt from 'jsonwebtoken'
const checkAuthSessionMiddleware = async (req, res, next) => {
    console.log(req.cookies[process.env.COOKIE_NAME])
    try {
        if (!req.cookies[process.env.COOKIE_NAME]) {
            return res.status(401).json({ success: false, message: "Không có cookies nào được tìm thấy" });
        } else {
            req.user = jwt.verify(req.cookies[process.env.COOKIE_NAME], process.env.SECRETKEY, (err, user) => {
                if (err) {
                    return res.status(400).json({ message: "cookies wrong" });
                }

                console.log(user)
                return user._doc;
            });

            return next();
        }
    } catch (error) {
        console.log("error here", error);
        return res.status(400).json({ message: "Session wrong" });
    }
};

export default checkAuthSessionMiddleware
