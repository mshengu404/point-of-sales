import { FastifyInstance } from "fastify";
import { ProductController } from "../controller/product.controller";

export class ProductRoute {
  private productController: ProductController;

  constructor(public _app: FastifyInstance) {
    this.productController = new ProductController();
  }

  initialize = () => {
    this._app.get("/products", this.productController.getAllProducts);
    this._app.post("/products", this.productController.createProduct);
    this._app.patch("/products/:id", this.productController.updateProduct);
    this._app.delete("/products/:id", this.productController.deleteProduct);
  };
}
