import { PrismaClient } from "@prisma/client";
import statusLog, { BAD, GOOD } from "./logger";

const good:GOOD = true;
const bad:BAD = false;

/**
@typedef {Object} Trainer - Represents a trainer in the system.
@property {number} [id] - Optional id is automatically generated if not supplied.
@property {string | null} username - The username of the trainer.
@property {string | null} email_address - The email address of the trainer.
@property {string | null} password - The password of the trainer.
*/
export type Trainer = {
  // Optional id is automatically generated if not supplied
  id?: number;
  username: string | null;
  email_address: string | null;
  password: string | null;
};

/**
 * @typedef {Object} TrainerService - Defines methods for working with trainers.
 * @property {function(Trainer): Promise<void>} create - Creates a new trainer in the system.
 * @property {function(string): Promise<Trainer>} get - Retrieves a trainer from the system based on their email address.
*/
export type TrainerService = {
  create: (trainer: Trainer) => Promise<void>;
  get: (email: string) => Promise<Trainer>;
};

/** Creates a new TrainerService instance.
 * @param {PrismaClient} db - The Prisma client instance to use for database access.
 * @returns {TrainerService} - The TrainerService instance.
*/
export default function service(db: PrismaClient): TrainerService {
  return {
    
    /** Creates a new trainer in the system.
     * @async
     * @function
     * @memberof TrainerService
     * @param {Trainer} trainer - The trainer object to create.
     * @throws {string} Throws a string error message if there is a database error.
    */
    async create(trainer: Trainer) {
      try {
        await db.trainer.create({
            data: trainer 
        }) 
      } catch (e) {
        statusLog(bad, `${e}\nOh...`);
        throw "TrainerService: Database error";
      }
    },
    
    /** Retrieves a trainer from the system based on their email address.
     * @async
     * @function
     * @memberof TrainerService
     * @param {string} email - The email address of the trainer to retrieve.
     * @returns {Promise<Trainer>} - A promise that resolves to the retrieved Trainer object.
     * @throws {string} Throws a string error message if there is a database error.
    */
    async get(email: string): Promise<Trainer> {
      try {
        const trainer = await db.trainer.findUniqueOrThrow({
          where: {
            email_address: email,
          }
        })
        return trainer;
      } catch (e) {
        statusLog(bad, `${e}\nOh...`);
        throw "TrainerService: Database error";
      }
    }
  }
}