import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided.", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token", success: false });
        }

        // Attach user data to request object
        req.user = decoded;
        next(); // Move to the next middleware or route
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token", success: false });
    }
};

export default authMiddleware;
