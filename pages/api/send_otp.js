import twilio from 'twilio';
import crypto from 'crypto';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);
let otpStore = {}; // Store OTPs in memory (for demonstration purposes)

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { phoneNumber } = req.body;

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        otpStore[phoneNumber] = otp; // Store OTP in memory

        try {
            await client.messages.create({
                body: `Your OTP is: ${otp}`,
                to: phoneNumber,
                from: twilioPhoneNumber,
            });

            return res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send OTP' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
