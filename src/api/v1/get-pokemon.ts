import { object, number } from "yup";
import service from "../../services/PokemonService";
import { prismaClient } from "../../services/db";
import { Response, Request } from 'express'

export default async function getPokemonHandler(req: Request, ctx: Response) {
  // Describe search schema
  const searchSchema = object({
    height: number().optional().moreThan(-1).integer(),
    weight: number().optional().moreThan(-1).integer(),
  });

  try {
    // Destructure parameters on successfull validation of request query
    const { height, weight } = await searchSchema.validate(req.query);
    
    // Success
    // Initiate service with database client
    const pokemonService = service(prismaClient);
    const pokemon = await pokemonService.findMany({height, weight})
    ctx.status(200).send(
      pokemon
    );
  } catch {
    // Failure
    ctx.send({
      status: 400,
      msg: 'Invalid request',
    })
  }
}
