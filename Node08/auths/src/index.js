// required modules
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("hbs");
const express = require("express");
const port = process.env.PORT || 3000;
const dbName = "authentication";
const url = `mongodb://127.0.0.1:27017/${dbName}`;
const app = express();

//important syntax line to submit forms and encode to url
app.use(express.urlencoded({ extended: false }));

/*
                  set the static paths
*/

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

app.get('/',(req,res)=>{
  res.render('home')
})
app.get('*',(req,res)=>{
  res.render('404')
})
app.get('/authentication',(req,res)=>{
  res.render('authentication')
})
app.get('/chat',(req,res)=>{
  res.render('chat')
})
app.get('/contact',(req,res)=>{
  res.render('contact')
})
app.get('/singin',(req,res)=>{
  res.render('singin')
})

app.get('/singup',(req,res)=>{
  res.render('singup')
})
app.get('/subscribers',(req,res)=>{
  res.render('subscribers')
})

// connect the database
mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log(`database has been connected at ${url}`);
}).catch((error)=>{
  console.error(`${error} to connect ${url}`)
})



//run on port
app.listen(port,()=>{
  console.log(`App is running at ${port}`);
})