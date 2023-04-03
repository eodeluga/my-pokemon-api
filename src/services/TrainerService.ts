import { PrismaClient } from "@prisma/client";

export type Trainer = {
  // Optional id is automatically generated if not supplied
  id?: number;
  username: string;
  email_address: string;
  password: string;
};

export type TrainerService = {
  create: (trainer: Trainer) => Promise<void>;
  get: () => Promise<Trainer>;
};

export default function service(db: PrismaClient): TrainerService {
  return {
    async create(trainer: Trainer) {
      
    }
  }
}