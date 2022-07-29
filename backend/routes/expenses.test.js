const request = require("supertest");
 
const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaXJkIiwiaWF0IjoxNjU1NjcyNjA0fQ.p0v7APr2bNYShovPGme5TCO3aaelinSVMwGcDzNwmNg";

describe("GET /expenses/:username", function () {
    test("works", async function () {
      const resp = await request(app)
          .get(`/expenses/third`)
          .set("authorization", `Bearer ${token}`);
      expect(resp.body).toEqual({
        expenses: []
      });
    });
  
  });