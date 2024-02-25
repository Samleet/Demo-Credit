import express, { Router } from "express";
import serverless from "serverless-http";
import routes from '../../src/routes/index';


const api = express();

api.use('/.netlify/functions/',routes);

export const handler = serverless(api);