import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Generate the hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        // Update user document based on email type
        if (emailType === 'VERIFY') {
            const updateUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000) // 1 hour expiry
                }
            });
            console.log("Updated user for verification", updateUser);

        } else if (emailType === 'RESET') {
            // Update forgot password token
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000) // 1 hour expiry
                }
            });
        }

        // Setup nodemailer transport
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "0d88ca64be4672",
                pass: "6ff96a5d4aadc4"
            }
        });

        // Prepare the email options
        const mailOptions = {
            from: 'dhirajsinghania09@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
                   Here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                   or copy and paste the link below in your browser:
                   <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                   </p>`
        };

        // Send the email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};
