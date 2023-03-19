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