const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

describe("POST auth register", () => {
  test("adds new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "123", password: "456" });
    console.log("res:", res);
    expect(res.status).toBe(200);
  });
});
