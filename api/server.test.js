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
  test("returns 200 status", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "123", password: "456" });
    expect(res.status).toBe(200);
  });

  test("returns error if no password", async () => {
    const res = await request(server).post("/api/auth/register").send({});
    expect(res.status).toBe(422);
  });
});

describe("POST auth login", () => {
  test("returns error if no user/pass", async () => {
    const res = await request(server).post("/api/auth/login").send({});
    expect(res.status).toBe(422);
  });

  test("yells at the user if username is not in use", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "123fdsfas", password: "45fdafas6" });
    expect(res.status).toBe(401);
  });
});
