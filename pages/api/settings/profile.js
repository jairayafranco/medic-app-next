import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token' });

    verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Error al verificar token' });
        return res.json({ ...decoded, status: true });
    });
}