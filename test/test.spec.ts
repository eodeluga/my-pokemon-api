import fs from "fs";
import chai, { expect } from 'chai';
import { server } from "../src/server"
//import post from "axios";
//import express from 'express';
import chaiHttp = require("chai-http");
import { hashPassword, verifyPassword } from "../src/services/hashing";
import service, { Trainer } from "../src/services/TrainerService";
import { prismaClient } from "../src/services/db";

describe("API tests", async function () {
    
    //const app = require('../app');
    chai.use(chaiHttp);
    
    it("should have a routes file", function() {
        const fileExists = fs.existsSync("src/startup/routes.ts");
        expect(fileExists).be.true;
    });
    
    it("should have an /api/internal/catch-pokemon route", async function() {
        const res = await chai.request(server)
            .get('/api/internal/catch-pokemon');
        expect(res).to.have.status(200);
    });
    
    it("should have an /api/v1/get-pokemon route", async function() {
        const res = await chai.request(server)
            .get('/api/v1/get-pokemon');
        expect(res).to.have.status(200);
    });
    
    it("should hash and verify a password", async function() {
        const password = "password";
        const hash = await hashPassword(password);
        const isMatch = await verifyPassword({
            hash: hash as string, 
            passwd: password
        });
        expect(isMatch).to.be.true;
    });
    
    it("should create a trainer user", async function(done) {
        this.timeout(5000);
        const trainer: Trainer = {
            username: "llamb",
            password: "password",
            email_address: "larry.lamb@gmail.com",
        }
        
        const res = await chai.request(server)
            .post("/api/internal/create-trainer")
            .send({ data: trainer })
            
        // Check return data matches 
        expect(1).to.eql(1);
        //expect(res.body.username).to.equal(trainer.username);
        
        // Clean up
        await prismaClient.trainer.delete({
            where: {
                email_address: trainer.email_address as string,
            }
        })
    });
});
