import express, { Express } from "express";
import session from "express-session";
import dotenv from "dotenv";
import database from "./src/configs/database/knex/index";
import ejs from 'ejs';
import routes from './src/routes/index';


const env = (dotenv.config( ));
const app: Express = express();
const host = process.env.APP_URL;
const port = process.env.PORT;


// Use neccessary utilities
app.use(express.json());
app.use(express.urlencoded());
// Set static files directory
app.use(express.static('public'));
// Define all the app routes
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
app.use(routes);


// Set EJS as the view engine
app.set('view engine', 'html');
app.set('views', 'src/views');

// Activate EJS on .HTML files
app.engine('html', ejs.renderFile);


app.listen(port, () => {

  console.log(`Server is running at ${host}:${port}`);
  
});