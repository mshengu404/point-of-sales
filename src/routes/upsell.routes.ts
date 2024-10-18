import { FastifyInstance } from "fastify";
import { UpsellController } from "../controller/upsell.controller";

export class UpsellRoute {
  private upsellController: UpsellController;

  constructor(public _app: FastifyInstance) {
    this.upsellController = new UpsellController();
  }

  initialize = () => {
    this._app.post("/upsell", this.upsellController.linkUpsell);
    this._app.get("/upsell/:productId", this.upsellController.getUpsells);
    this._app.delete(
      "/upsell/:productId/:upsellProductId",
      this.upsellController.removeUpsell
    );
  };
}
