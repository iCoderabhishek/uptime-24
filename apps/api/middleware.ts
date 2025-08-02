import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "./config";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - Missing Bearer token' });
    }

    const token = authHeader.split(' ')[1]; // Extract actual JWT token

    try {
        const decoded = jwt.verify(token, JWT_PUBLIC_KEY, { algorithms: ['RS256'] });
        console.log("Decoded JWT:", decoded);

        if (!decoded || typeof decoded !== "object" || !("sub" in decoded)) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token structure' });
        }

        req.userId = decoded.sub as string;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ error: 'Unauthorized - Token invalid' });
    }
}
