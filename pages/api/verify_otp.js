export default function handler(req, res) {
    if (req.method === 'POST') {
        const { phoneNumber, otp } = req.body;

        // Check if the OTP is correct
        if (otpStore[phoneNumber] === otp) {
            delete otpStore[phoneNumber]; // Remove OTP after successful verification
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
