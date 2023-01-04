const app = require("../app");
const request = require("supertest");

describe("Home Page", () => {
  it("GET / (contains shop name and <nav> tag element)", async () => {
    const shopName = "TEss";
    await request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toMatch(shopName);
        expect(response.text).toMatch("<nav>");
      });
  });
});