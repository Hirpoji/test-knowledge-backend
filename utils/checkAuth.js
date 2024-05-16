import jwt from "jsonwebtoken";

export default function checkAuth(req, res, next) {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    
    if(!token){
        return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    try {
        const decoded = jwt.verify(token, "hipsterJo");
        req.userId = decoded.id;
            
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Пользователь не авторизован" });
    }
}