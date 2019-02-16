import { expect } from "chai";
import { get } from "./handler";

describe("handler test suite", () => {
  let response;

  beforeEach(async () => {
    response = await get();
  });

  it("should return a 200 status", () => {
    expect(response.statusCode).to.equal(200);
  });

  it("should include the categories", () => {
    expect(Object.keys(response.body).length).to.be.above(0);
  });
});
