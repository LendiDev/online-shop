const app = require("../app");
const request = require("supertest");

describe('Products', () => {
  it("GET /products (contains products)", async () => {
    await request(app)
      .get("/products")
      .expect(200)
      .then((response) => {
        expect(response.text).toMatch("TEss");
        expect(response.text).toMatch("<nav>");
        expect(response.text).toMatch("View product");
      });
  });

  it('GET /products --> should return products page with a list of products', () => {
    return request(app)
      .get('/products')
      .expect(200)
      .then(response => {
        expect(response.type).toBe('text/html');
        expect(response.text).toContain('<li>');
        expect(response.text).toContain('class="product-item"');
        expect(response.text).toContain('class="products-grid"');
      });
  });
});
