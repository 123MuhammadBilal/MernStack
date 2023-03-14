const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const dbName = "myAuthUsers";
const url = `mongodb://127.0.0.1:27017/${dbName}`;
const port = process.env.PORT || 3000;
const app = express();

//importent syntax line for submition
app.use(express.urlencoded({ extended: false }));

//set stactic path & set midware
const PathPublic = path.join(__dirname, "public");
app.use(express.static(PathPublic));

//set view custom path
const templates = path.join(__dirname, "./templates");
//set view engine
app.set("view engine", "hbs");
//set view custom
app.set("views", templates);



//routing
app.get("/", (req, res) => {
  res.render("singup");
});
//routing
app.get("/home", (req, res) => {
  app.post("/singin", async (req, res) => {
    try {
      const check = await myUser.findOne({ name: req.body.name });
      if (check.password === req.body.password) {
        res.render("home");
      } else {
        res.send("wrong password or gmail");
        res.render("singin");
      }
    } catch (error) {
      console.error(error);
      res.send("wrong password");
    }
  });
});
//routing
app.get("/singup", (req, res) => {
  res.render("singup");
});
//routing
app.get("/singin", (req, res) => {
  res.render("singin");
});
//routing
app.get("*", (req, res) => {
  res.render("404");
});

//listen port
app.listen(port, () => {
  console.log(`node is running at ${port}`);
});

// >>>>>>>>>>>>>>>>>connect the mongodb
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database has been connected to ${url}`);
  })
  .catch((error) => {
    console.error(`${error} to connect ${url}`);
  });
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//post form for singinSchema and singup
app.post("/singup", async (req, res) => {
  const usersData = {
    name: req.body.name,
    password: req.body.password,
  };
  await myUser.insertMany([usersData]);
  console.log("singup succeed");
  res.redirect("home");
});

app.post("/singin", async (req, res) => {
  try {
    const check = await myUser.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password or gmail");
    }
  } catch (error) {
    console.error(error);
    res.send("wrong password");
  }
});

//post form for subscription
app.post("/subscription_from", async (req, res) => {
  const newslet = {
    subscription_name: req.body.subscription_name,
    subscription_mail: req.body.subscription_mail,
  };
  await subscriber.insertMany([newslet]);
  console.log(`Subscription succeed`);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kkmuhammadbilal2@gmail.com",
      pass: "epkqmckonglpvjua",
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "kkmuhammadbilal2@gmail.com", // sender address
    to: req.body.subscription_mail, // list of receivers
    subject: "Web Subscription", // Subject line
    text: "Thanks for Subscription you will uptodate", // plain text body
    html: '<h1>FOR MORE<h1><br><a href="tel:+92305 769 2658" >Contact with Developer</a><br><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQisFXfjVw8WUmBPXoLmmZXnUm1jgRfXzuglHLEI0Jt3Q5bV8_lfxLFbyi-_W5J6xkTrjA&usqp=CAU" alt="">', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (res, error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: %s", info.messageId);
    }
  });
  res.redirect("/home");
});

//post form for contactUs
app.post("/getTouch_form", async (req, res) => {
  const mailsMe = {
    fname: req.body.fname,
    lname: req.body.lname,
    interest: req.body.interest,
    budget: req.body.budget,
    phone: req.body.phone,
    sms: req.body.sms,
  };
  await contactUs.insertMany([mailsMe]);
  console.log(`sumit succeed`);
});

//create schema for form
const singinSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [5, "reqired 5 letters"],
    autocompelte: false,
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "reqired 5 letters"],
    autocompelte: false,
  },
});

//create schema for newletter
const newsletter = mongoose.Schema({
  subscription_name: {
    type: String,
    required: true,
    autocompelte: false,
  },
  subscription_mail: {
    type: String,
    required: true,
    autocompelte: false,
  },
});

//create schema for newletter
const touchInDatas = mongoose.Schema({
  fname: String,
  lname: String,
  interest: String,
  budget: String,
  phone: String,
  sms: String,
});

// define the myUser
const myUser = mongoose.model("myUser", singinSchema);
//define the subscriber
const subscriber = mongoose.model("subscriber", newsletter);
//define the contactUs
const contactUs = mongoose.model("contactUs", touchInDatas);










