const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username1, password1) {
    const userExistsVar = false
    console.log("HEEERREEEe");
    console.log(username1);
    for(let i = 0; i<= ALL_USERS.length; i++){
        console.log(ALL_USERS[i].username);
        if(ALL_USERS[i].username == username1 && ALL_USERS[i].password == password1){
            console.log("inside FOR LOOP");
            const userExistsVar = true
            break
        }
    }
    return userExistsVar
}

app.post("/signin", function (req, res) {
    console.log("inside post");
  const username = req.body.username;
  const password = req.body.password;

    console.log(username);
    console.log(password);

  if (!userExists(username, password)) {
    console.log("denied")
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)