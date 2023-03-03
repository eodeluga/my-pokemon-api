/*
 * This service module is the API interface with the Pokemon database
 */
import { PrismaClient } from "@prisma/client";
import statusLog, { GOOD, BAD} from "./logger";

const good:GOOD = true;
const bad:BAD = false;

export type Pokemon = {
  // Optional id is automatically generated if not supplied
  id?: number;
  name: string;
  height: number;
  weight: number;
  artwork_url: string;
};

export type SearchParams = {
  height?: number | undefined;
  weight?: number | undefined;
};

export type PokemonService = {
  createMany: (pokemon: Pokemon []) => Promise<void>;
  findMany: (searchParams: SearchParams) => Promise<Pokemon []>;
};



export default function service(db: PrismaClient): PokemonService {
  return {
    
    /** Creates multiple database records from an array
     * @param {Pokemon []} pokemon - An array of Pokemon objects
     * @returns {Promise<void>} - Promise of void type
     */
    async createMany(pokemon: Pokemon[]): Promise<void> {
      try {
        const createdPokemon = await db.pokemon.createMany({
          // Spread the pokemon array into Prisma query
          data: [...pokemon],
          // Won't throw error if same record enetered again
          skipDuplicates: true,
        });

        statusLog(
          good,
          `All Pokemon caught and stored in database 😀:\n${JSON.stringify(createdPokemon, null, 4)}`
        );
      } catch (e) {
        statusLog(bad, `${e}\nOh...`);
        throw "PokemonService: Database error";
      }
    },
    
    /** Returns found Pokemon matching search parameters
     * @param {SearchParams} searchParams - The search criteria for finding Pokemon
     * @returns {Promise<Pokemon []>} - An array of Pokemon objects
     */
    async findMany(searchParams: SearchParams): Promise<Pokemon[]> {
      try {
        const foundPokemon = await db.pokemon.findMany({
          where: {
            height: {
              gte: searchParams.height === 0 ? 1 : searchParams.height,
            },
            weight: {
              gte: searchParams.weight,
            },
          },
        });
        return foundPokemon;
      } catch (e) {
        statusLog(bad, `${e}\nOh...`);
        throw "PokemonService: Database error";
      }
    },
  };
}
