import conn from "../../../config/db_config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
    const db = conn.collection('users');
    const handleException = ({ code, message, status, type }) => res.status(code).json({ status, message, type });

    if (req.method === 'POST') {
        const { username, password } = req.body;
        if (!username || !password) return handleException({ code: 400, message: 'Usuario y contraseña requeridos', status: false, type: 'warning' });

        db.findOne({ user: username }).then(user => {
            if (!user) return handleException({ code: 404, message: 'Usuario y/o contraseña incorrectos', status: false, type: 'warning' });

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return handleException({ code: 500, message: 'Error al comparar contraseña', status: false, type: 'error' });
                if (!result) return handleException({ code: 404, message: 'Usuario y/o contraseña incorrectos', status: false, type: 'warning' });

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

                return res.json({ status: true });
            });
        }).catch(() => {
            return handleException({ code: 500, message: 'Error al buscar usuario', status: false, type: 'error' });
        });
    }

    if (req.method !== 'POST') {
        return handleException({ code: 405, message: 'Método no permitido', status: false, type: 'error' });
    }
}