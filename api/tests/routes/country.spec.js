/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);

const recipe = {
  title: "Milanesa a la napolitana",
};

const recipe2 = {
  title: "Pollo con papas",
  summary: " Pollo con papas",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: false }).then(() => {
      Recipe.create(recipe);
      Recipe.create(recipe2);
    })
  );
  describe("GET /recipes", () => {
    it("should get 200", () => agent.get("/recipes").expect(200));
    it("should get all recipes", () =>
      agent
        .get("/recipes")
        .query({ title: "" })
        .then((res) => {
          expect(res.body).to.have.lengthOf.above(1);
        }));
  });

  describe("GET /recipes/:id", () => {
    it("should get 200", () => agent.get("/recipes/17").expect(200));
    it("should get one recipe in json", () =>
      agent.get("/recipes/17").expect("Content-Type", /json/));
    it("should get one recipe", () =>
      agent.get("/recipes/17").then((res) => {
        expect(res.body).to.not.be.an("array");
      }));
  });
});
