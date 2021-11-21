const express = require('express');
//const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();


const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://shrouded-journey-38552.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

//Connect Database
mongoose.connect(
    "mongodb+srv://prakirti:123kirti@cluster0.xja6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true}
    )
    .then(()=>console.log("DB connected"))
    .catch(error=>console.log(error))

    app.use(cors());
    
//Init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.json({msg:'Welcome to the Contact Keeper API.'})
})

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));


const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
//We use PORT from the environment variable or local port. Also, we've set a callback to see if the server starts successfully.
app.listen(PORT, ()=> {
    console.log(`Server Started on Port ${PORT}`);
});