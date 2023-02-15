import conn from "../../../config/db_config";

export default function signosVitalesHistory(req, res) {
    const db = conn.collection("signosVitalesHistory");

    if (req.method === "POST") {
        const data = req.body;
        if (!data) return res.status(400).json({ status: false, message: 'Datos requeridos' });

        const newHistoryRegister = {
            "id": Date.now(),
            "fecha": new Date().toLocaleString(),
            ...data
        };

        db.insertOne(newHistoryRegister).then(() => {
            return res.status(200).json({ status: true, message: 'Signos vitales creados correctamente', newHistoryRegister });
        }).catch(() => {
            return res.status(400).json({ error: true, message: 'Error al crear los signos vitales' });
        });
    }
}