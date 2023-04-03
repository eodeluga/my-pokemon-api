import { object, number } from "yup";

import { Response, Request } from 'express'
import { Trainer } from "../../services/TrainerService";

export default async function getTrainerHandler(req: Request, ctx: Response) {
    const trainer: Trainer = req.header;
    console.log(trainer);
    
}