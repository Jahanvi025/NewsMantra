import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized. No token provided.", success: false });
      }
  
      const token = authHeader.split(" ")[1]; // Extract just the token
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
  
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
  };
  

export default authMiddleware;
