//to,from,subject,text
const mailer = require('nodemailer');

///function

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"joshikrish635@gmail.com",
            pass:"aaye jcrh egse zwbk"
        }
    })

    const mailOptions = {
        from: 'joshikrish635@gmail.com',
        to: to,
        subject: subject,
        // text: text
        html:"<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}
//sendingMail("samir.vithlani83955@gmail.com","Test Mail","this is test mail")