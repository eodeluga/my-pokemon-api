import express, {Express} from "express";
import bodyParser from 'body-parser';
import catchPokemonHandler  from '../api/internal/catch-pokemon';
import catchGetPokemon from '../api/v1/get-pokemon';
import statusLog, { GOOD, BAD } from "../utils/logger";

const good: GOOD = true;
const bad: BAD = false;

export const routes = (app: Express) => {

  try {
    statusLog(good, "setting up router..");
    
    app.use(bodyParser.json());
    app.use(express.static("public"));

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    
    app.get("/api/internal/catch-pokemon", (req, res) => catchPokemonHandler(res));
    
    app.get("/api/v1/get-pokemon", (req, res) => catchGetPokemon(req, res));
    
    
    statusLog(good, "routes ready!");
  } catch (err) {
    
    statusLog(bad, `Something went wrong..\n${err}`);
  }
};
