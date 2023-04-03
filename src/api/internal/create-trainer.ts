import { object, number } from "yup";

import { Response, Request } from 'express'
import { Trainer } from "@prisma/client";

export default async function createTrainerHandler(req: Request, ctx: Response) {
    const trainer: Trainer = req.header;
    console.log(trainer);
    
}