import service, { Pokemon } from "../../services/PokemonService";
import { prismaClient } from "../../services/db";
import statusLog, { BAD } from "../../services/logger";
import { Response } from 'express'
import get, { AxiosResponse }  from 'axios';

const bad: BAD = false;

/** Creates and returns a Pokemon object by parsing CSV line values 
 * @param {string} csvLine - Line of text representing a CSV record
 * @returns {Pokemon} - A Pokemon object representation of the CSV
*/
const parseCsvLine = (csvLine: string): Pokemon => {
  // Split lines at commas to get CSV values and destructure
  // required values into variables
  const [id, name, , height, weight, , ,] = csvLine.split(",");
  const artwork_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;

  const pokemon: Pokemon = {
    id: parseInt(id),
    name: name,
    artwork_url: artwork_url,
    height: parseInt(height),
    weight: parseInt(weight),
  };

  return pokemon;
};

type ResponseObj = {
  status: number;
  msg: string;
};

export default async function catchPokemonHandler(ctx: Response) {
  // Get list of Pokemon
  return get("https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon.csv")
    .then(async (res: AxiosResponse) => {     
      const pokemonArr: Pokemon [] = [];
      // Split the text at line breaks to create CSV record array
      const csvArr = res.data.split("\n");
      
      // Skip first element as its the CSV header row and last as some bad data
      for (let i = 1; i < csvArr.length - 1; i++) {
        pokemonArr.push(
          parseCsvLine(csvArr[i])
        );
      }
      
      // Initiate service with database client
      const pokemonService = service(prismaClient);

      // Insert pokemon into database
      await pokemonService.createMany(pokemonArr)
      
      // Success 
      ctx.send({
        status: res.status,
        msg: res.statusText
      });
    })
    .catch(( err => {
      let resObj : ResponseObj;
       
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        resObj = {
          status: err.response.status,
          msg: err.response.data,
        }
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        resObj = {
          status: err.response.status,
          msg: err.request,
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        resObj = {
          status: err.response?.status,
          msg: err.message,
        }
      }
      statusLog(bad, `catch-pokemon: Couldn't download Pokemon data\n${JSON.stringify(resObj.msg)}\nOh...`);
      ctx.send (resObj)
    }));
}
