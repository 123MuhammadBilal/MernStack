const mongoose = require('mongoose');
const hbs = require('hbs');
const multer = require('multer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const dbName = 'mtData';
const uri = `mongodb://127.0.0.1:27017/${dbName}`;
const port = process.env.PORT || 3000;


//important required for submitions that encode the url
app.use(express.urlencoded({extended:false}));



//static path set 
const staticPathPublic = path.join(__dirname, 'public');
app.use(express.static(staticPathPublic));

//static path set 
const partialsPath = path.join(__dirname, 'partials');
hbs.registerPartials(partialsPath);

//static path set 
const templatePath = path.join(__dirname, 'templates');


app.set('view engine','hbs');
app.set('views',templatePath);


// Set up the route to render the upload form
app.get('/upload', (req, res) => {
    res.render('upload');
  });
  


// connect database
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>{
  console.log(`database connected ${uri}`)
}).catch((error)=>{
  console.log(error);
})



// Set up the multer middleware to handle image uploads
const upload = multer({
  dest: 'uploads/'
});


// Define a schema for the image collection
const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

// Create a model for the image collection
const Image = mongoose.model('Image', ImageSchema);

// Define a route to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  // Read the contents of the uploaded file
  const data = fs.readFileSync(req.file.path);

  // Create a new document in the image collection
  const newImage = new Image({
    data: data,
    contentType: req.file.mimetype
  });

  // Save the document to the database
  newImage.save((err, image) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while uploading the image');
    } else {
      res.status(200).send('Image uploaded successfully');
    }
  });
});
  




  // Start the server
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });