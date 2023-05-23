import conn from '../../../config/db_config';
import jwt from 'jsonwebtoken';

export default async function pacienteHandler(req, res) {
    const db = conn.collection('pacientes');
    const dbSV = conn.collection('signosVitalesHistory');
    const handleException = ({ code, message, status, type }) => res.status(code).json({ status, message, type })

    if (req.method === "GET") {
        const { id } = req.query;
        if (!id) return handleException({ code: 400, message: 'Identificacion requerida', status: false, type: 'warning' });

        db.findOne({ "datosBasicos.idUsuario": Number(id), estado: "ACTIVO" }, { projection: { _id: 0, estado: 0 } })
            .then((paciente) => {
                if (!paciente) return handleException({ code: 404, message: 'Paciente no encontrado', status: false, type: 'warning' });
                dbSV.find({ idUsuario: Number(id) }, { projection: { _id: 0, idUsuario: 0 } }).sort({ fecha: -1 }).toArray()
                    .then((signosVitalesHistory) => {
                        paciente.signosVitalesHistory = signosVitalesHistory;
                        return res.status(200).json({ status: true, paciente });
                    }).catch(() => {
                        return handleException({ code: 500, message: 'Error al obtener el historial de signos vitales del paciente', status: false, type: 'error' });
                    });
            }).catch(() => {
                return handleException({ code: 500, message: 'Error al obtener el paciente', status: false, type: 'error' });
            });
    }

    if (req.method === "POST") {
        const data = req.body;
        if (!data) return handleException({ code: 400, status: false, message: 'Datos requeridos', type: 'warning' });

        db.findOne({ "datosBasicos.idUsuario": data.idUsuario }).then((paciente) => {
            if (paciente?.estado === "INACTIVO") return handleException({ code: 400, status: false, message: 'El paciente ya existe y esta inactivo', type: 'warning' });
            if (paciente) return handleException({ code: 400, status: false, message: 'El paciente ya existe', type: 'warning' });
            db.insertOne({ datosBasicos: data, estado: "ACTIVO" })
                .then(() => {
                    saveAuditData({ action: 'CREAR PACIENTE', req, data: data.idUsuario });
                    return res.status(200).json({ status: true, message: 'Paciente creado correctamente', type: 'success' });
                }).catch(() => {
                    return handleException({ code: 500, status: false, message: 'Error al crear el paciente', type: 'error' });
                });
        }).catch(() => {
            return handleException({ code: 500, status: false, message: 'Error al crear el paciente', type: 'error' });
        });
    }

    if (["PUT", "PATCH"].includes(req.method)) {
        const method = req.method;
        const data = req.body;
        const { id, opt } = req.query;
        if (!data || !id || !opt) return handleException({ code: 400, status: false, message: 'Datos requeridos', type: 'warning' });

        if (data.idUsuario) {
            const paciente = await db.findOne({ "datosBasicos.idUsuario": Number(data.idUsuario) });
            if (paciente) return handleException({ code: 400, status: false, message: 'La identificacion ya existe', type: 'warning' });
        }

        const update = { $set: {} };
        if (method === "PUT") {
            update.$set = { [opt]: data };
        } else {
            for (const key in data) {
                update.$set[opt + "." + key] = data[key];
            }
        }

        db.findOneAndUpdate({ "datosBasicos.idUsuario": Number(id) }, update)
            .then(({ value: paciente }) => {
                if (!paciente) return handleException({ code: 404, status: false, message: 'Paciente no encontrado', type: 'warning' });
                if (data.idUsuario && (paciente.datosBasicos.idUsuario !== data.idUsuario)) {
                    dbSV.updateMany({ idUsuario: Number(id) }, { $set: { idUsuario: Number(data.idUsuario) } });
                }
                saveAuditData({ action: 'ACTUALIZAR PACIENTE', req, data: id });
                return res.status(200).json({ status: true, message: 'Paciente actualizado correctamente', type: 'success' });
            }).catch(() => {
                return handleException({ code: 500, status: false, message: 'Error al actualizar el paciente', type: 'error' });
            });
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id) return handleException({ code: 400, status: false, message: 'Identificacion requerida', type: 'warning' })

        db.findOneAndUpdate({ "datosBasicos.idUsuario": Number(id) }, { $set: { estado: "INACTIVO" } })
            .then((paciente) => {
                if (!paciente.value) return handleException({ code: 404, status: false, message: 'Paciente no encontrado', type: 'warning' });
                dbSV.deleteMany({ idUsuario: Number(id) });
                saveAuditData({ action: 'ELIMINAR PACIENTE', req, data: id });
                return res.status(200).json({ status: true, message: 'Paciente eliminado correctamente', type: 'success' });
            }).catch(() => {
                return handleException({ code: 500, status: false, message: 'Error al eliminar el paciente', type: 'error' });
            });
    }

    function saveAuditData({ action, req, data }) {
        try {
            const token = req.headers.cookie.substring(6);
            const { username, cc, admin } = jwt.verify(token, process.env.SECRET);
            const newAuditData = {
                admin,
                username,
                cc: cc || '',
                action,
                date: new Date().toLocaleString(),
                data
            }
            const db = conn.collection('auditoria');
            db.insertOne(newAuditData);
        } catch (error) {
            console.log(error);
        }
    }
}