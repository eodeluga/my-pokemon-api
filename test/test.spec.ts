import fs from "fs";
import chai, { expect } from 'chai';
import chaiHttp = require("chai-http");

describe("API tests", async function () {
    
    chai.use(chaiHttp);
    
    it("has a routes file", function () {
        const fileExists = fs.existsSync("./startup/routes.ts");
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
    
});
