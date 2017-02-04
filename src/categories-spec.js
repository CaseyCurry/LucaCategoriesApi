"use strict";

const expect = require("chai")
  .expect;
const categories = require("./categories.json");

describe("categories test suite", () => {
  describe("unit test suite", () => {
    it("should define categories and subcategories; no more; no less", () => {
      Object
        .keys(categories)
        .forEach(category => {
          const subcategories = categories[category];
          expect(subcategories.length)
            .to
            .be
            .above(0);
          subcategories
            .forEach(subcategory => {
              expect(subcategory)
                .to
                .be
                .a("string");
            });
        });
    });
  });
});
