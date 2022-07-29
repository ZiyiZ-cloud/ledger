"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");

const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldyIsImlhdCI6MTY1NDE5MjM2NH0.KgaelTcz-RSmzH7sJVlHdRpNub5-1iYdHaaSwHn6z08"


/************************************** register */

describe("register", function () {
    const newUser = {
      username: "new",
      password: "password",
      firstName: "test",
      lastName: "testor",
      email: "test@test.com",
    };
  
    test("works", async function () {
      let user = await User.register(newUser);
      const found = await db.query("SELECT * FROM users WHERE username = 'new'");
      expect(found.rows.length).toEqual(1);
      expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });
  
    test("bad request with dup data", async function () {
      try {
        await User.register({
          ...newUser,
          password: "password",
        });
        await User.register({
          ...newUser,
          password: "password",
        });
        fail();
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("new", "password");
    expect(user).toEqual({
        username: "new",
        first_name: "test",
        last_name: "testor",
        email: "test@test.com",
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("c1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let user = await User.findUser("new");
    expect(user).toEqual({
        username: "new",
        first_name: "test",
        last_name: "testor",
        email: "test@test.com",
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.findUser("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    first_name: "NewF",
    last_name: "NewF",
    email: "new@email.com",
  };

  test("works", async function () {
    let job = await User.updateUser("new", updateData);
    expect(job).toEqual({
      username: "new",
      ...updateData,
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.updateUser("nope", {
        firstName: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request if no data", async function () {
    expect.assertions(1);
    try {
      await User.updateUser("c1", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await User.removeUser("new");
    const res = await db.query(
        "SELECT * FROM users WHERE username='new'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await User.removeUser("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

