const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;
const userRoute = require("./routes/userRoute")
const db = require("./db");
db.connect();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.use(userRoute)