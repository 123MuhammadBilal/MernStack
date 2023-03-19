const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');
const hbs = require ('hbs');
const mongoose = require ('mongoose');
const express = require ('express');
const app = express();
const dbName =  'ecom';
const uri = `mongodb://127.0.0.1:27017/${dbName}`;
const port = process.env.PORT || 3000;

//submition encode 
app.use(express.urlencoded({extended:false}));



//set static path 
const stacticPaths = path.join(__dirname, 'public');
app.use(express.static(stacticPaths));
app.set('view engine' , 'hbs');

//set template path 
const templatePaths = path.join(__dirname, 'template');
app.set('views' , templatePaths)

//set partial path 
const partialPaths = path.join(__dirname, 'partial');
hbs.registerPartials(partialPaths);


// home page routing
app.get('/', (req,res)=>{
    res.render('index');
});


// gagets page routing
app.get('/gagets', (req,res)=>{
    res.render('gagets');
});

// male page routing
app.get('/male', (req,res)=>{
    res.render('male');
});


// female page routing
app.get('/female', (req,res)=>{
    res.render('female');
});


// female page routing
app.get('/random', (req,res)=>{
    res.render('random');
});



// unknown page routing
app.get("/*", (req, res) => {
    res.render("404");
});




app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database has been connected to ${uri}`);
  })
  .catch((error) => {
    console.error(`${error} to connect ${uri}`);
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
    console.log(`item uploaded`);
});

  const touchInDatas = mongoose.Schema({
    fname: String,
    lname: String,
    interest: String,
    budget: String,
    phone: String,
    sms: String,
  });
//creating the collections
const randomItems = mongoose.model('randomItems' , touchInDatas)
