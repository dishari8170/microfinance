export default function handler(req, res) {

    if (req.method === 'POST') {
        const { username, password } = req.body;

/*
        const axios = require('axios').default;

        const options = {
            method: 'POST',
            url: 'https://control.msg91.com/api/v5/flow',
            headers: {
                authkey: '434134Ath9vC3D5a674188ebP1',
                accept: 'application/json',
                'content-type': 'application/json'
            },
            data: '{\n  "template_id": "674175dbd6fc0524f2303bd2",\n  "short_url": "0",\n  "realTimeResponse": "1", \n  "recipients": [\n    {\n      "mobiles": "916296099913",\n      "var1": "1234"\n    }\n  ]\n}'
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
        } catch (error) {
            console.error(error);
        }

 */

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