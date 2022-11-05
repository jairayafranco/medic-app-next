export default function unauthorizedHandler(req, res) {
    return res.status(401).json({ message: 'Unauthorized' });
}