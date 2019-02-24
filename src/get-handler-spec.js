import { expect } from "chai";
import proxyquire from "proxyquire";

describe("handler test suite", () => {
  let response;

  describe("when the token is valid", () => {
    beforeEach(async () => {
      const handler = proxyquire("./get-handler", {
        jsonwebtoken: {
          verify: () => {}
        }
      });
      response = await handler.get({
        headers: {
          Authorization: "Bearer 123"
        }
      });
    });

    it("should return a 200 status", () => {
      expect(response.statusCode).to.equal(200);
    });

    it("should include the categories", () => {
      expect(Object.keys(response.body).length).to.be.above(0);
    });

    it("should return the cache control header with a max age", () => {
      expect(
        response.headers["Cache-Control"].indexOf("max-age=") === 0
      ).to.equal(true);
    });
  });

  describe("when the token is invalid", () => {
    beforeEach(async () => {
      const handler = proxyquire("./get-handler", {
        jsonwebtoken: {
          verify: () => {
            throw new Error();
          }
        }
      });
      response = await handler.get({
        headers: {
          Authorization: "Bearer 123"
        }
      });
    });

    it("should return a 401 status", () => {
      expect(response.statusCode).to.equal(401);
    });
  });
});
