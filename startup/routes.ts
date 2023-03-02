import express, {Express} from "express";
import bodyParser from 'body-parser'
import statusLog, { GOOD, BAD } from "../utils/logger";

const good: GOOD = true;

export const routes = (app: Express) => {


  statusLog(good, "setting up router..");
/*   app.use(express.json());
  app.set("view engine", "ejs");
  app.use(expressLayouts);
  app.set("layout extractScripts", false);

  app.set("layout", "layouts/default"); */

  app.use(bodyParser.json());
  app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.get("/api/internal/catch-pokemon", (req, res) => {
    res.send("catch-pokemon");
  });
  
  app.get("/api/v1/get-pokemon", (req, res) => {
    res.send("get-pokemon");
  });
  
  

  statusLog(good, "routes ready!");
};
