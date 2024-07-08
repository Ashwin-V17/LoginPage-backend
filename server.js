const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://Test:<test123>@cluster1.htqinka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
);
//guys, if mongo throws error, use mongoDb compass
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    res.status(200).json({
      message: "Login successful",
      redirectUrl: "http://ecom-site.com",
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
