import express, { Router } from "express";
import serverless from "serverless-http";
import ejs from 'ejs';
import routes from '../../src/routes/index';
import session from "express-session";
import app from "../../app"


app.set('views', 'views');
export const handler = serverless(app);