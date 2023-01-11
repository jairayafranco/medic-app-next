import bcrypt from 'bcrypt';
import conn from "../../../config/db_config";

export default function createUserHandler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        data.password = bcrypt.hashSync(data.password, 10);

        conn.collection('users').insertOne(data).then(() => {
            return res.json({ status: true, message: 'Usuario creado correctamente' });
        }).catch(() => {
            return res.status(500).json({ error: true, message: 'Error al crear usuario' });
        });
    }
}