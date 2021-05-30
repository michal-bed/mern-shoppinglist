require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const itemRoutes = require('./routes/api/items')
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/users');

const cors = require('cors')
const app = express();

//app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const mongoURI = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@cluster0.hx0pv.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useCreateIndex : true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
                .then(() => console.log("Connected with the database server"))
                .catch((err) => console.log("Failed to connect with the database server:", err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));