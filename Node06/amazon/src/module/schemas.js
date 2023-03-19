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
