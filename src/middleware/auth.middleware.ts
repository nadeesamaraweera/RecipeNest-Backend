import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
    interface Request {
        user?: {
            id: number;
        };
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({error: 'Authentication required'});
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        req.user = {id: decoded.userId};
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
};