require('dotenv').config();

const express = require("express");
const res = require('express/lib/response');
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

const apiRoute = express.Router();

const transporter = nodemailer.createTransport({
    pool: true,
    host : "smtp.ionos.fr",
    port : 465,
    secure : true,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASS
    }
});

apiRoute.post("/sendmail", (req, res) => {
    const {fullname , email, message} = req.body;

    const mailData = {
        from : process.env.EMAIL,
        to : process.env.EMAIL,
        subject : `Message de ${fullname} !`,
        text : `${message}
        Mail de contact : ${email}`
    }

    transporter.sendMail(mailData, (err, info) => {
        if(err){
            res.status(500).send("Error sending your email ! :(");
            return console.log(err);
        }
        res.status(200).send({message : "Mail sent !"});
    });
});

app.use("/api", apiRoute);

app.use(express.static(__dirname + '/frontend/dist'));


const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Server listening on port ${port}`);
});
