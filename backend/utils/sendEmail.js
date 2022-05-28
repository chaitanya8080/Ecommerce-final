

const nodeMailer = require("nodemailer");
const { options } = require("nodemon/lib/config");

const sendEmail = async(option)=>{
    const transporter = nodeMailer.createTransport({
        service :"gmail",
        auth:{
            user:process.env.SMPT_MAIL,
            password:process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to : options.email,
        subject: options.subject,
        text:options.message,
    }
   await transporter.sendMail(mailOptions);
}

module.export = sendEmail;