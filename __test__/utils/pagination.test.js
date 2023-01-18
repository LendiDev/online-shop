const pagination = require("../../utils/pagination");

describe("pagination()", () => {
  test("should take a number of page and limit per page and then return an object", () => {
    expect(typeof pagination(1, 10)).toBe("object");
  });

  test("should take a number of page and limit per page and then return an object that contains skip and limit properties", () => {
    const output = pagination(1, 10);

    expect(output).toHaveProperty("skip");
    expect(output).toHaveProperty("limit");
  });

  test("should take a number of page and limit per page and then return an object with expected output", () => {
    const output1 = pagination(1, 10);
    const output2 = pagination(2, 10);

    expect(output1).toHaveProperty("skip", 10);
    expect(output1).toHaveProperty("limit", 10);
    expect(output2).toHaveProperty("skip", 20);
    expect(output2).toHaveProperty("limit", 10);
  });

  test("should take a number of page and limit per page and then return an object with expected output", () => {
    const output1 = pagination(1, 10);
    const output2 = pagination(2, 10);

    expect(output1).toHaveProperty("skip", 10);
    expect(output1).toHaveProperty("limit", 10);
    expect(output2).toHaveProperty("skip", 20);
    expect(output2).toHaveProperty("limit", 10);
  });

  test("should take no parameters and then return an object with skip and limit options", () => {
    const output = pagination();

    expect(output).toHaveProperty("skip", 0);
    expect(output).toHaveProperty("limit", 10);
  });

  test("should take only number of page and then return an object with skip and limit options", () => {
    const output = pagination(5);

    expect(output).toHaveProperty("skip", 50);
    expect(output).toHaveProperty("limit", 10);
  });

  test("should take only limit parameter and then return an object with skip and limit options", () => {
    const output = pagination(null, 5);

    expect(output).toHaveProperty("skip", 0);
    expect(output).toHaveProperty("limit", 5);
  });
});
