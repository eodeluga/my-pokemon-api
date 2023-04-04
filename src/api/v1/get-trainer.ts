import { object, number } from "yup";

import { Response, Request } from 'express'
import { Trainer } from "../../services/TrainerService";

export default async function getTrainerHandler(req: Request, res: Response) {
    res.send("get-trainer");
}