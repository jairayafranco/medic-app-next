import conn from "../../../config/db_config";
import _ from "lodash";

export default function handler(req, res) {
    const db = conn.collection("pacientes");

    if (req.method === "GET") {
        db.find({}, {
            projection: {
                datosBasicos: {
                    idUsuario: 1,
                    nombreUsuario: 1,
                    fechaConsulta: 1,
                    tipoConsulta: 1,
                },
            },
            limit: 5,
            sort: { _id: -1 },
        }).toArray().then((pacientes) => {
            _.forEach(pacientes, (paciente) => {
                paciente.datosBasicos.fechaConsulta = paciente._id.getTimestamp();
            });
            return res.status(200).json({ status: true, pacientes });
        }).catch(() => {
            return res.status(500).json({ status: false, message: 'Error al obtener pacientes', type: 'error' });
        });
    }
}