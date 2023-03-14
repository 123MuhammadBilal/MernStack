const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const dbName = "iAi";
const uri = `mongodb://127.0.0.1:27017/${dbName}`;
const port = process.env.PORT || 5000;

//static path
//path.join() is methode to connect current path to next path "public"
const pathSet = path.join(__dirname, "public");

// built in mildware that is express.static()
app.use(express.static(pathSet));

// set the view engine
app.set("view engine", "hbs");

// root path of the page
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`listen at ${port}`);
});

//lets connect the mongodb
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

//let me set the structur of "Schema"
const mobiDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minLenght: [5, "minimum"],
    maxLenght: 30,
  },
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// collection creation
const Mobi = new mongoose.model("Mobi", mobiDataSchema);

// data instert using async function
const createDocument = async () => {
  try {
    // creating document
    const mobiDets = new Mobi({
      name: "vivo",
      ctype: "android",
      videos: 21,
      author: "vivo comapny",
      active: true,
    });

    // creating document
    const userDets = new Mobi({
      name: "bilu",
      ctype: "android",
      videos: 21,
      author: "vivo comapny",
      active: true,
    });

    // creating document
    const ownrDets = new Mobi({
      name: "bilu khan",
      ctype: "android",
      videos: 21,
      author: "vivo comapny",
      active: true,
    });
    const result = await Mobi.insertMany([mobiDets, userDets, ownrDets]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();

const getDocuments = async () => {
  try {
    const resultData = await Mobi.find({ name: "vivo" })
      .select({ name: 1 })
      .limit(1);
    console.log(resultData);
  } catch (error) {
    console.log(error);
  }
};

// getDocuments();

const updateDocOne = async (_id) => {
  try {
    const updateRes = await Mobi.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: "vivo",
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(updateRes);
  } catch (error) {
    console.log(error);
  }
};
// updateDocOne("640dfcb127e9d018c5da4d89")

const updateDocDel = async (_id) => {
  try {
    const delRes = await Mobi.deleteOne({ _id });
    console.log(delRes);
  } catch (error) {
    console.log(error);
  }
};
// updateDocDel("640dfcb127e9d018c5da4d89")
