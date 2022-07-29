
const db = require('../db.js');
const { BadRequestError, NotFoundError } = require("../expressError");
const Expense = require("./expense.js");


describe("create", function () {
    const newExpense = {
        amount: 20,
        category: "healthcare",
        detail: "hostipal",
        date:"2022-05-03T04:00:00.000Z",
        username: "last",
      };

  test("works", async function () {
    let expense = await Expense.createExpense(newExpense.username,newExpense);
    expect(expense).toEqual({
      id: expect.any(Number),
      amount: 20,
        category: "healthcare",
        detail: "hostipal",
        date:expect.any(Date),
        username: "last",
    });
  });
});


describe("expenses", function () {
  test("get", async function () {
    let expenses = await Expense.getExpense('last');
    let id = expenses[0].id;
    expect(expenses).toEqual([
      {
        id: expect.any(Number),
        amount: 20,
        category: "healthcare",
        detail: "hostipal",
        date:expect.any(Date),
        username: "last",
      },
    ]);
  });

  test("remove", async function () {
    let expenses = await Expense.getExpense('last');
    let id = expenses[0].id;
    await Expense.deleteExpense(id);
    const res = await db.query(
        "SELECT id FROM expenses WHERE id=$1", [id]);
    expect(res.rows.length).toEqual(0);
  });

});

