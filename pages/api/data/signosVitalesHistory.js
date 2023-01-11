import conn from "../../../config/db_config";

export default function signosVitalesHistory(req, res) {
    const db = conn.collection("signosVitalesHistory");

    if (req.method === "GET") {
        const { id } = req.query;
        if (!id) return res.status(400).json({ status: false, message: 'Identificacion requerida' });

        db.find({ "idUsuario": Number(id) }, { projection: { idUsuario: 0, _id: 0 } }).sort({ fecha: -1 }).toArray()
            .then((signosVitalesHistory) => {
                if (!signosVitalesHistory) return res.status(404).json({ status: false, message: 'Historia no encontrada' });
                return res.status(200).json({ status: true, history: signosVitalesHistory });
            }).catch(() => {
                return res.status(500).json({ error: true, message: 'Error al buscar signos vitales' });
            });
    }

    if (req.method === "POST") {
        const data = req.body;
        if (!data) return res.status(400).json({ status: false, message: 'Datos requeridos' });

        const history = {
            "id": Date.now(),
            "fecha": new Date().toLocaleString(),
            ...data
        };

        db.insertOne(history).then(() => {
            return res.status(200).json({ status: true, message: 'Signos vitales creados correctamente' });
        }).catch(() => {
            return res.status(400).json({ error: true, message: 'Error al crear los signos vitales' });
        });
    }
}