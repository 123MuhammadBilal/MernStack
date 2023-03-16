const mongoose = require('mongoose')
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();


//listen port
app.listen(port, () => {
  console.log(`node is running at ${port}`);
});

const uri = `mongodb+srv://kkmuhammadbilal:kkmuhammadbilal@cluster0.luqsygi.mongodb.net/live?retryWrites=true&w=majority`;

async ()=>{
  try {
    await mongoose.connect(uri,()=>{
      console.log('connected')
    })
  } catch (error) {
    console.error(error)
  }

}


// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log(`Database has been connected to ${url}`);
// }).catch((error) => {
//     console.error(`${error} to connect ${url}`);
// });
