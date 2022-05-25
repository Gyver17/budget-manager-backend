import nodemailer from "nodemailer";
import config from "../../const/config";

export default async function (email, subject, html) {
  const { auth } = config;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    //host: "smtp.gmail.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth,
  });

  let info = await transporter.sendMail({
    from: '"Budget Manager" <joseangel171001@gmail.com>',
    to: email,
    subject: subject,
    html: html,
  });

  return info;
}
