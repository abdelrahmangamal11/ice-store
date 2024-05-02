const express = require("express");
const mongoose = require("mongoose");
const authrout = require("./Router/Authrouter");
const cookieparser = require("cookie-parser");
const { sendtoken, checkuser } = require("./middleware/authmiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieparser());

// view engine
app.set("view engine", "ejs");

// database connection    mongodb+srv://abdelrahman:<password>@cluster0.kdyulpu.mongodb.net/icestore

const dbURI =
  "mongodb+srv://abdelrahman:123567Ty@cluster0.kdyulpu.mongodb.net/icestore";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// app.listen(3000)

// routes
app.get("*", checkuser /*to access all the routes*/);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", sendtoken, (req, res) => res.render("smoothies"));

// app.get('/set_cookies',(req,res)=>{
//   // res.setHeader('Set-Cookie','UserName=true')
//   res.cookie('userName',true,{maxAge:1000*60*60*24})/*(لما بتعمله كدا مبيظهرش لل فرونت اند (httponly))*/
//   res.cookie('employee',false)
//   res.send('cookies has been send')
// })

// app.get('/read_cookies',(req,res)=>{
//   const cookies=req.cookies;
//   console.log(cookies);
//   res.json(cookies)
// });

app.use(authrout);
