import User from '@/models/userModel';
import nodemailer  from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any)=>{
    try{
       const hashedToken =  await bcrypt.hash(userId.toString(),10);
      if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000})
      }else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,{ forgotPasswordToken:hashedToken,    forgotPasswordTokenExpiry:Date.now()+3600000})
      }

  // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0d88ca64be4672",
    pass: "6ff96a5d4aadc4"
  }
});
          const mailOptions={
            from: 'dhirajsinghania09@gmail.com', 
            to: email,  
            subject: emailType === 'VERIFY'?"Verify you email ":"Reset ", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail ? token=${hashedToken}"
            
            >Here</a> to ${emailType === "VERIFY"?"verify your Email":"reset your password"} of copy and paste the link below in your browser .
            <br> ${process.env.DOMAIN}/verifyemail?token${hashedToken}
            </p>`,
          }
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse;

    }catch(error :any){
        throw new Error(error.message)
    }
}