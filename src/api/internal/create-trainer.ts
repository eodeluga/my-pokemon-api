import { object, string, ValidationError } from "yup";

import { Response, Request } from 'express'

import service, { Trainer } from "../../services/TrainerService";
import { prismaClient } from "../../services/db";

export default async function createTrainerHandler(req: Request, res: Response) {
  // Describe search schema
  const trainerSchema = object().shape({
    username: string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters')
      .max(20, 'Username must be less than 20 characters'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
        'Password must include at least one number and one special character'
      ),
    email_address: string()
      .email('Invalid email address')
      .required('Email is required'),
    });
  
  try {
    const trainerService = service(prismaClient);
    const { username, password, email_address } = await trainerSchema.validate(req.body.data);
    const trainer: Trainer = await trainerService.create({
        username,
        password,
        email_address
    });
    res.status(200).send({
        id: trainer.id,
        username: trainer.username,
    })
  } catch(err) {
    
    // Format the failure message before sending
    const errObj = err as ValidationError;
    String(errObj?.name).startsWith("ValidationError") 
      ? err = `${errObj.name}: ${errObj.message}`
      : err = "Invalid request";
    
    res.status(400).send({
      status: 400,
      msg: err,
    });
  }
}