import conn from '../../../config/db_config';

export default function pacienteHandler(req, res) {
    const db = conn.collection('pacientes');

    if (req.method === "GET") {
        const { id } = req.query;
        if (!id) return res.status(400).json({ status: false, message: 'Identificacion requerida' });

        db.findOne({ "datosBasicos.idUsuario": Number(id) }, { projection: { _id: 0 } }).then((paciente) => {
            if (!paciente) return res.status(404).json({ status: false, message: 'Paciente no encontrado' });
            return res.status(200).json({ status: true, paciente });
        }).catch(() => {
            return res.status(500).json({ error: true, message: 'Error al buscar paciente' });
        });
    }

    if (req.method === "POST") {
        const data = req.body;
        if (!data) return res.status(400).json({ status: false, message: 'Datos requeridos' });

        db.findOne({ "datosBasicos.idUsuario": data.idUsuario }).then((paciente) => {
            if (paciente) return res.status(400).json({ status: false, message: 'El paciente ya existe' });

            db.insertOne({ datosBasicos: data }).then(() => {
                return res.status(200).json({ status: true, message: 'Paciente creado correctamente' });
            }).catch(() => {
                return res.status(400).json({ error: true, message: 'Error al crear el paciente' });
            });
        }).catch(() => {
            return res.status(400).json({ error: true, message: 'Error al crear el paciente' });
        });
    }

    if (req.method === "PUT") {
        const data = req.body;
        const { id, opt } = req.query;
        if (!data || !id || !opt) return res.status(400).json({ status: false, message: 'Datos requeridos' });

        const update = { $set: {} };
        for (const key in data) {
            update.$set[opt + "." + key] = data[key];
        }

        db.findOneAndUpdate({ "datosBasicos.idUsuario": Number(id) }, update).then((paciente) => {
            if (!paciente.value) return res.status(404).json({ status: false, message: 'Paciente no encontrado' });
            return res.status(200).json({ status: true, message: 'Paciente actualizado correctamente' });
        }).catch(() => {
            return res.status(400).json({ error: true, message: 'Error al actualizar el paciente' });
        });
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id) return res.status(400).json({ status: false, message: 'Identificacion requerida' });

        db.findOneAndDelete({ "datosBasicos.idUsuario": Number(id) }).then((paciente) => {
            if (!paciente.value) return res.status(404).json({ status: false, message: 'Paciente no encontrado' });
            return res.status(200).json({ status: true, message: 'Paciente eliminado correctamente' });
        }).catch(() => {
            return res.status(500).json({ error: true, message: 'Error al eliminar paciente' });
        });
    }
}