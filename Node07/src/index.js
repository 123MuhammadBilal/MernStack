const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http');

//important syntax line to submit forms and encode to url
app.use(express.urlencoded({ extended: false }));

//find static path and its equal to const PathPublic
const PathPublic = path.join(__dirname, "public");
//set view custom static path equal to const templates
const templates = path.join(__dirname, "./template");
//set view custom static path equal to const templates
const partialsPath = path.join(__dirname, "partial");
//hbs use partials
hbs.registerPartials(partialsPath);

//set the static path
app.use(express.static(PathPublic));

//set view engine
app.set("view engine", "hbs");

//set view custom
app.set("views", templates);



app.get('/', (req, res) => {
    const options = {
      hostname: 'ip-api.com',
      path: '/json',
      method: 'GET'
    };
  
    const req2 = http.request(options, res2 => {
      let body = '';
      res2.on('data', chunk => {
        body += chunk;
      });
  
      res2.on('end', () => {
        const location = JSON.parse(body);
        res.render('index', { location: location });
      });
    });
  
    req2.on('error', error => {
      console.error(error);
    });
  
    req2.end();
  });
  




app.listen(port,()=>{
    console.log(`app listen at ${port}`);
});