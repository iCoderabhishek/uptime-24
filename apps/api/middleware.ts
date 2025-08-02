import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getClerkSigningKey } from "./config";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - Missing Bearer token' });
    }

    const token = authHeader.split(' ')[1]; // Extract actual JWT token
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }
    

    try {
        // Decode the token header to get the kid (key ID)
        const decodedHeader = jwt.decode(token, { complete: true });
        if (!decodedHeader || !decodedHeader.header.kid) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token header' });
        }

        // Get the signing key from Clerk's JWKS endpoint
        const signingKey = await getClerkSigningKey(decodedHeader.header.kid);
        
        const decoded = jwt.verify(token, signingKey, { algorithms: ['RS256'] });
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