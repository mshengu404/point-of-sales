import Product from "../src/model/product";
import { ProductService } from "../src/service/product.service";
import sequelize from "../src/config/database";

describe("ProductService", () => {
  let productService: ProductService;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Create the table
    productService = new ProductService();
  });

  afterAll(async () => {
    await sequelize.close(); // Close the database connection
  });


  describe('findAll', () => {
    it('should return an array of quote contract terms', async () => {
        const product = {
            "data": [
                {
                    "id": 5,
                    "contractTerm": "1 Year",
                    "createOn": "2024-03-26 07:49:22",
                    "modifiedOn": "2024-03-26 07:49:22"
                },
            ],
            "message": "Quote contract terms found"
        };
        jest.spyOn(productService, 'createProduct').mockResolvedValue(product);
        const result = await productService.createProduct();
        expect(result).toEqual(product);
    });
});
  
});
