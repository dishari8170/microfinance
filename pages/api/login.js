export default function handler(req, res) {

    if (req.method === 'POST') {
        const { username, password } = req.body;


        if (username === 'user' && password === 'pass') {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}