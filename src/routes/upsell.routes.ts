import { FastifyInstance } from "fastify";
import { UpsellController } from "../controller/upsell.controller";

export class UpsellRoute {
    private upsellController: UpsellController;

    constructor(public _app: FastifyInstance) {
        this.upsellController = new UpsellController();
    }

    // Define initialize as an arrow function
    initialize = () => {
        this._app.post('/upsell', this.upsellController.linkUpsell); // Create transaction
        this._app.get('/upsell/:productId', this.upsellController.getUpsells); // Get transaction details
        this._app.get('/upsell/:productId/:upsellProductId', this.upsellController.getUpsells); // Get transaction details
    }
}
