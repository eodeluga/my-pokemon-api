//import express, {Express} from "express";
import express, { Application, Request, Response } from 'express';
import oauthServer from "express-oauth-server";
//var oauthServer = require('express-oauth-server');
import bodyParser from "body-parser";
import catchPokemonHandler  from "../api/internal/catch-pokemon";
import getPokemonHandler from "../api/v1/get-pokemon";
import statusLog, { GOOD, BAD } from "../utils/logger";
import createTrainerHandler from "../api/internal/create-trainer";
import getTrainerHandler from "../api/v1/get-trainer";

const good: GOOD = true;
const bad: BAD = false;

export const routes = (app: Application) => {

  try {
    statusLog(good, "setting up router..");
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    app.use(express.static("public"));
    
    (app as any).oauth = new oauthServer({
      model: require('../services/oauth')
    });

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
    
    // Authorised routes
    app.post(
      "/api/internal/create-trainer",
      // Authenticate route using oauth
      (app as any).oauth.authenticate(),
      (req: Request, res: Response) => createTrainerHandler(req, res)
    );
    
    app.get(
      "/api/v1/get-trainer",
      // Authenticate route using oauth
      (app as any).oauth.authenticate(),
      (req: Request, res: Response) => getTrainerHandler(req, res)
    );
    
    // Public routes
    app.get("/api/internal/catch-pokemon", (req: Request, res: Response) => catchPokemonHandler(res));
    app.get("/api/v1/get-pokemon", (req: Request, res: Response) => getPokemonHandler(req, res));         
    
    statusLog(good, "routes ready!");
  } catch (err) {
    
    statusLog(bad, `Something went wrong..\n${err}`);
  }
};
