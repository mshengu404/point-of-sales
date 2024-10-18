import Product from "../model/product";

export class ProductService {
  constructor() {}

  public createProduct = async (productData: Product): Promise<Product> => {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      console.error("Error in ProductService - createProduct:", error);
      throw new Error("Unable to create product");
    }
  };

  public getAllProducts = async (): Promise<Product[]> => {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      console.error("Error in ProductService - getAllProducts:", error);
      throw new Error("Unable to retrieve products");
    }
  };

  public updateProduct = async (
    id: number,
    productData: Product
  ): Promise<Product | null> => {
    const { ...updateData } = productData;
    try {
      const product = await Product.findOne({ where: { id } });
      if (!product) return null;

      await product.update(updateData);
      return product;
    } catch (error) {
      console.error("Error in ProductService - updateProduct:", error);
      throw new Error("Unable to update product");
    }
  };

  public deleteProduct = async (id: number): Promise<boolean> => {
    try {
      const result = await Product.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error("Error in ProductService - deleteProduct:", error);
      throw new Error("Unable to delete product");
    }
  };
}
