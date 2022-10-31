import conn from "../../../config/db_config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
    const db = conn.collection('users');

    if (req.method === 'POST') {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Usuario y contraseña requeridos' });

        db.findOne({ user: username }).then(user => {
            if (!user) return res.status(404).json({ status: false, message: 'Usuario y/o contraseña incorrectos' });

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return res.status(500).json({ error: true, message: 'Error al comparar contraseñas' });
                if (!result) return res.status(404).json({ status: false, message: 'Usuario y/o contraseña incorrectos' });

                const token = jwt.sign({
                    currentUser: user._id, user: user.user, username: user.username, cc: user.cc || '', admin: user.admin
                }, process.env.SECRET, { expiresIn: '7d' });

                const serialized = serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/'
                });
                res.setHeader('Set-Cookie', serialized);

                return res.json({ auth: true });
            });
        }).catch(() => {
            return res.status(500).json({ error: true, message: 'Error al buscar usuario' });
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}