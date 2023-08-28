const nodemailer = require("nodemailer");

const email = 'switchhelp101@gmail.com';
const pass = 'icui4cumise7';

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: pass,
  },
});


module.exports.sendAdminAddedEmail = (email,confirmationCode) => {
    console.log("Check");
    transport.sendMail({
      from: "PORT SYSTEM",
      to: email,
      subject: "Please complete you account",
      html: `<h1>Complete Your Account</h1>
          <h2>Hello</h2>
          <p>Please complete your account by clicking the link below</p>
          <a href=http://localhost:8080/auth/complete/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};
