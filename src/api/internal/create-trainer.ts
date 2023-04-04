import { object, number } from "yup";

import { Response, Request } from 'express'

import service, { Trainer } from "../../services/TrainerService";
import { prismaClient } from "../../services/db";

export default async function createTrainerHandler(req: Request, res: Response) {
  try {
    const trainerService = service(prismaClient);
    const { data } = req.body;
    const trainer: Trainer = await trainerService.create(data);
    res.status(200).send({
        id: trainer.id,
        username: trainer.username,
    })
  } catch {
    // Failure
    res.status(400).send({
      status: 400,
      msg: 'Invalid request',
    });
  }
}