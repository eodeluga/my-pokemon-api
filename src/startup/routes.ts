import express, {Express} from "express";
import oauthServer from "express-oauth-server";
import bodyParser from "body-parser";
import catchPokemonHandler  from "../api/internal/catch-pokemon";
import getPokemonHandler from "../api/v1/get-pokemon";
import statusLog, { GOOD, BAD } from "../utils/logger";
import createTrainerHandler from "../api/internal/create-trainer";
import getTrainerHandler from "../api/v1/get-trainer";

const good: GOOD = true;
const bad: BAD = false;

export const routes = (app: Express) => {

  try {
    statusLog(good, "setting up router..");
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    app.use(express.static("public"));
    
    app.oauth = new oauthServer({
      model: require('./model')
    });

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    
    // Authorised routes
    app.post("/api/internal/create-trainer", (req, res) => createTrainerHandler(req, res));
    app.get("/api/v1/get-trainer", (req, res) => getTrainerHandler(req, res));
    
    // Public routes
    app.get("/api/internal/catch-pokemon", (req, res) => catchPokemonHandler(res));
    app.get("/api/v1/get-pokemon", (req, res) => getPokemonHandler(req, res));         
    
    statusLog(good, "routes ready!");
  } catch (err) {
    
    statusLog(bad, `Something went wrong..\n${err}`);
  }
};
