import { object, number } from "yup";

import { Response, Request } from 'express'
import { Trainer } from "../../services/TrainerService";

export default async function getTrainerHandler(req: Request, ctx: Response) {
    
    console.log("get-trainer");
    
}