import express, { Router } from "express";
import serverless from "serverless-http";
import ejs from 'ejs';
import routes from '../../src/routes/index';
import session from "express-session";
import app from "../../app"


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(
  session({
    secret: "demoCredit",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
)

app.set('view engine', 'html');
app.set('views', '../../src/views');
app.engine('html', ejs.renderFile);

app.use(routes);

export const handler = serverless(app);