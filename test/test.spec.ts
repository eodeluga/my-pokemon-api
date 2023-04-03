import fs from "fs";
import chai, { expect } from 'chai';
import chaiHttp = require("chai-http");
import { hashPassword, verifyPassword } from "../src/services/hashing";
import service, { Trainer } from "../src/services/TrainerService";
import { prismaClient } from "../src/services/db";

describe("API tests", async function () {
    
    chai.use(chaiHttp);
    
    it("has a routes file", function () {
        const fileExists = fs.existsSync("src/startup/routes.ts");
        expect(fileExists).be.true;
    });
    
    it("has a /api/internal/catch-pokemon route", async function () {
        const res = await chai.request('http://localhost:3000')
            .get('/api/internal/catch-pokemon');
        expect(res).to.have.status(200);
    });
    
    it("has a /api/v1/get-pokemon route", async function () {
        const res = await chai.request('http://localhost:3000')
            .get('/api/v1/get-pokemon');
        expect(res).to.have.status(200);
    });
    
    it("hashes and verifies a password", async function () {
        const password = "password";
        const hash = await hashPassword(password);
        const isMatch = await verifyPassword({
            hash: hash as string, 
            passwd: password
        });
        expect(isMatch).to.be.true;
    })
    
    it("retrieves the correct db record", async function () {
        const trainer: Trainer = {
            username: "eodeluga",
            password: "password",
            email_address: "eodeluga@gmail.com",
        }
        
        const trainerService = service(prismaClient);
        const { username, password, email_address } = 
            await trainerService.get(trainer.email_address as string);
            
        expect(username).to.equal(trainer.username);
        expect(email_address).to.equal(trainer.email_address);
        expect(password).to.equal(trainer.password);
    })
});
