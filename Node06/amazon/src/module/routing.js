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

