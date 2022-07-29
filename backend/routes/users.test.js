const request = require("supertest");
 
const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaXJkIiwiaWF0IjoxNjU1NjcyNjA0fQ.p0v7APr2bNYShovPGme5TCO3aaelinSVMwGcDzNwmNg";

describe("GET /users/:username", function () {
    test("works", async function () {
      const resp = await request(app)
          .get(`/third`)
          .set("authorization", `Bearer ${token}`);
      expect(resp.body).toEqual({
        user: {
            username: "third",
            first_name: "third",
            last_name: "first",
            email: "third@joelburton.com"
        },
      });
    });
  
  });
  