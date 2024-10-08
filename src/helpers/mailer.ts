import nodemailer  from 'nodemailer';

export const sendEmail = async({email,emailType,userId}:any)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          const mailOptions={
            from: 'dhirajsinghania09@gmai;com', // sender address
            to: emailType === 'VERIFY'?"Verify you email ":"Reset ", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>",
          }
          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse;

    }catch(error :any){
        throw new Error(error.message)
    }
}