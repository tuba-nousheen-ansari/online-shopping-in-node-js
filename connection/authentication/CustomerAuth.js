exports.isAuth=(req,res,next) => {
    if(req.session.user_identity)
    {
        next();
    }
    else
        res.redirect('/customer');
}
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "geekhunters001@gmail.com",
    pass: "geek@hunters",
  },
});

var mailOptions = {
  from: "geekhunters001@gmail.com",
  to: "nousheentuba@gmail.com",
  subject: "Solution of your problem",
  html: "<h1>Hey Dear,</h1><p>we will resolve your problem as soon as possible...</p>",
};
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
