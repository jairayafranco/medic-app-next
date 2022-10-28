import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default function logoutHandler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: 'No token' });

        try {
            verify(token, process.env.SECRET);
            const serialized = serialize('token', null, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            })
            res.setHeader('Set-Cookie', serialized);
            return res.json({ auth: false });
        } catch (error) {
            return res.status(500).json({ message: 'Error al verificar token' });
        }
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}