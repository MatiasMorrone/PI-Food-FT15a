const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: false }));
    describe("title", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should throw an error if summary is null", () => {
        Recipe.create({ title: "Milanesa a la napolitana" })
          .then(() => done(new Error("It requires a summary")))
          .catch(() => done());
      });
      it("should throw an error if summary is null", () => {
        Recipe.create({ name: "Pizza" })
          .then(() => done(new Error("It requires a title")))
          .catch(() => done());
      });
      it("should work when its a valid title and summary", () => {
        Recipe.create({
          title: "Ravioles con bolognesa",
          summary: "Pastas rellenas con salsa roja y trozos de carne picada",
        });
      });
    });
  });
});
