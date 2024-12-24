import jwt from "jsonwebtoken";

const SECRET_KEY = "raju";

// Generate JWT
export const generateToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verify JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null; // Invalid token
    }
};
