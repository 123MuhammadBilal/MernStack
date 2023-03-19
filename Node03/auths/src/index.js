//adding bodyParser
const bodyParser = require("body-parser");
//nodemailer for mailing
const nodemailer = require("nodemailer");
//mongoose for database
const mongoose = require("mongoose");
//path for set the static paths
const path = require("path");
//hbs is a view engine
const hbs = require("hbs");
//express framwork of node for routing
const express = require("express");
//database name
const dbName = "myAuthUsers";
//address of local mongodb address
const url = `mongodb://127.0.0.1:27017/${dbName}`;
//local hosting at port 300
const port = process.env.PORT || 3000;
//express app equal to const app
const app = express();

//important syntax line to submit forms and encode to url
app.use(express.urlencoded({ extended: false }));

//find static path and its equal to const PathPublic
const PathPublic = path.join(__dirname, "public");
//set view custom static path equal to const templates
const templates = path.join(__dirname, "./templates");
//set view custom static path equal to const templates
const partialsPath = path.join(__dirname, "partials");
//hbs use partials
hbs.registerPartials(partialsPath);

//set the static path
app.use(express.static(PathPublic));

//set view engine
app.set("view engine", "hbs");

//set view custom
app.set("views", templates);

//routing
app.get("/", (req, res) => {
  //render always response the file
  res.render("singup");
});

app.get("/subscribers", async (req, res) => {
  const subscribers = await subscriber.find({});
  const subscriptionData = subscribers.map(subscriber => {
    return {
      subscriptionName: subscriber.subscription_name,
      subscriptionMail: subscriber.subscription_mail
    };
  });
  res.render("subscribers", { subscriptionData });
});


//routing
app.get("/chat", async (req, res) => {
  res.render("chat");
});

//routing
app.get("/home", async (req, res) => {
  res.render("home");
});



//routing
app.get("/contact", (req, res) => {
  res.render("contact");
});

//routing
app.get("/singup", (req, res) => {
  //render always response the file
  res.render("singup");
});

//routing
app.get("/singin", (req, res) => {
  //render always response the file
  res.render("singin");
});

//routing
app.get("*", (req, res) => {
  //render always response the file
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

app.post("/singup", async (req, res) => {
  //requests for singup form on submit
  const usersData = {
    name: req.body.name,
    password: req.body.password,
  };
  //to insert data in to database the query is used .insertMany([])
  await myUser.insertMany([usersData]);
  console.log("singup succeed");
  res.redirect("home");
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
// define the myUser and create collection with name of "myUser" in database
const myUser = mongoose.model("myUser", singinSchema);

//post form for subscription
app.post("/subscription_from", async (req, res) => {
  const newslet = {
    subscription_name: req.body.subscription_name,
    subscription_mail: req.body.subscription_mail,
  };
  await subscriber.insertMany([newslet]);
  console.log(`Subscription succeed`);
  // create reusable transporter object using the default SMTP transport
  //creating transpoter
  let transporter = nodemailer.createTransport({
    //selecting service "gmail"
    service: "gmail",
    //auther gmail and password who send the mails and password find from gmail-app password genrator
    auth: {
      user: "kkmuhammadbilal2@gmail.com",
      pass: "epkqmckonglpvjua",
    },
  });

  // setup email data with requirements
  let mailOptions = {
    // sender address
    from: "kkmuhammadbilal2@gmail.com",
    // list of receivers that is requested by submition
    to: req.body.subscription_mail,
    // Subject line
    subject: "Web Subscription",
    // plain text body
    text: "Thanks for Subscription you will uptodate",
    // use can use html also
    html: '<h1>FOR MORE<h1><br><a href="tel:+92305 769 2658" >Contact with Developer</a><br><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQisFXfjVw8WUmBPXoLmmZXnUm1jgRfXzuglHLEI0Jt3Q5bV8_lfxLFbyi-_W5J6xkTrjA&usqp=CAU" alt="">', // html body
  };

  // send mail with already defined transport object
  transporter.sendMail(mailOptions, (res, error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: %s", info.messageId);
      res.redirect("/home");
    }
  });
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
// define the myUser and create collection with name of "myUser" in database
const subscriber = mongoose.model("subscriber", newsletter);

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
  //creating transpoter
  let transporter = nodemailer.createTransport({
    //selecting service "gmail"
    service: "gmail",
    //auther gmail and password who send the mails and password find from gmail-app password genrator
    auth: {
      user: "kkmuhammadbilal2@gmail.com",
      pass: "epkqmckonglpvjua",
    },
  });

  // setup email data with requirements
  let mailOptions = {
    // sender address
    from: "kkmuhammadbilal2@gmail.com",
    // list of receivers that is requested by submition
    to: "kkmuhammadbilal2@gmail.com",
    // Subject line
    subject: "client",
    // use can use html also
    html: `
    <h1>Client Here</h1>
    <p><strong>First Name:</strong> ${req.body.fname}</p>
    <p><strong>Last Name:</strong> ${req.body.lname}</p>
    <p><strong>Interest:</strong> ${req.body.interest}</p>
    <p><strong>Budget:</strong> ${req.body.budget}</p>
    <p><strong>Phone:</strong> ${req.body.phone}</p>
    <p><strong>SMS:</strong> ${req.body.sms}</p>
    <br>
    <p>For more information, please contact the developer at <a href="tel:+92305 769 2658">+92305 769 2658</a></p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQisFXfjVw8WUmBPXoLmmZXnUm1jgRfXzuglHLEI0Jt3Q5bV8_lfxLFbyi-_W5J6xkTrjA&usqp=CAU" alt="">
  `,
  };

  // send mail with already defined transport object
  transporter.sendMail(mailOptions, (res, error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: %s", info.messageId);
    }
  });
  res.redirect("/contact");
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
// define the myUser and create collection with name of "myUser" in database
const contactUs = mongoose.model("contactUs", touchInDatas);
