const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect(
  'mongodb+srv://dotan:' +
    process.env.MONGO_ATLAS_PM +
    '@gala-t0dd4.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);
var whitelist = ['http://localhost:4200'];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

const user = require('./routes/user');

app.use(express.json());
app.use('/api/user', user);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
