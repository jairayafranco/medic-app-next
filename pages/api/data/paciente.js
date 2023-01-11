import conn from '../../../config/db_config';

export default function pacienteHandler(req, res) {
    const db = conn.collection('pacientes');
    const handleException = ({ code, message, status, type }) => res.status(code).json({ status, message, type })

    if (req.method === "GET") {
        const { id } = req.query;
        if (!id) return handleException({ code: 400, message: 'Identificacion requerida', status: false, type: 'warning' });

        db.findOne({ "datosBasicos.idUsuario": Number(id) }, { projection: { _id: 0 } }).then((paciente) => {
            if (!paciente) return handleException({ code: 404, message: 'Paciente no encontrado', status: false, type: 'warning' });
            return res.status(200).json({ status: true, paciente });
        }).catch(() => {
            return handleException({ code: 500, message: 'Error al obtener el paciente', status: false, type: 'error' });
        });
    }

    if (req.method === "POST") {
        const data = req.body;
        if (!data) return handleException({ code: 400, status: false, message: 'Datos requeridos', type: 'warning' });

        db.findOne({ "datosBasicos.idUsuario": data.idUsuario }).then((paciente) => {
            if (paciente) return handleException({ code: 400, status: false, message: 'El paciente ya existe', type: 'warning' });

            db.insertOne({ datosBasicos: data }).then(() => {
                return res.status(200).json({ status: true, message: 'Paciente creado correctamente', type: 'success' });
            }).catch(() => {
                return handleException({ code: 500, status: false, message: 'Error al crear el paciente', type: 'error' });
            });
        }).catch(() => {
            return handleException({ code: 500, status: false, message: 'Error al crear el paciente', type: 'error' });
        });
    }

    if (req.method === "PUT") {
        const data = req.body;
        const { id, opt } = req.query;
        if (!data || !id || !opt) return handleException({ code: 400, status: false, message: 'Datos requeridos', type: 'warning' });

        db.findOneAndUpdate({ "datosBasicos.idUsuario": Number(id) }, { $set: { [opt]: data } }).then((paciente) => {
            if (!paciente.value) return handleException({ code: 404, status: false, message: 'Paciente no encontrado', type: 'warning' });
            return res.status(200).json({ status: true, message: 'Paciente actualizado correctamente', type: 'success' });
        }).catch(() => {
            return handleException({ code: 500, status: false, message: 'Error al actualizar el paciente', type: 'error' });
        });
    }

    if (req.method === "PATCH") {
        const data = req.body;
        const { id, opt } = req.query;
        if (!data || !id || !opt) return handleException({ code: 400, status: false, message: 'Datos requeridos', type: 'warning' });

        const update = { $set: {} };
        for (const key in data) {
            update.$set[opt + "." + key] = data[key];
        }

        db.findOneAndUpdate({ "datosBasicos.idUsuario": Number(id) }, update).then((paciente) => {
            if (!paciente.value) return handleException({ code: 404, status: false, message: 'Paciente no encontrado', type: 'warning' });
            return res.status(200).json({ status: true, message: 'Paciente actualizado correctamente' });
        }).catch(() => {
            return handleException({ code: 500, status: false, message: 'Error al actualizar el paciente', type: 'error' });
        });
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id) return handleException({ code: 400, status: false, message: 'Identificacion requerida', type: 'warning' })

        db.findOneAndDelete({ "datosBasicos.idUsuario": Number(id) }).then((paciente) => {
            if (!paciente.value) return handleException({ code: 404, status: false, message: 'Paciente no encontrado', type: 'warning' });
            return res.status(200).json({ status: true, message: 'Paciente eliminado correctamente', type: 'success' });
        }).catch(() => {
            return handleException({ code: 500, status: false, message: 'Error al eliminar el paciente', type: 'error' });
        });
    }
}