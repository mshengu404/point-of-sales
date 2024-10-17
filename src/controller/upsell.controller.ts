import { FastifyRequest, FastifyReply } from 'fastify';
import { UpsellService } from '../service/upsell.service';
import Upsell from '../model/upsell';
import { RemoveUpsellParams } from '../interface/upsell-request.interface';

export class UpsellController {
    private upsellService: UpsellService;

    constructor() {
        this.upsellService = new UpsellService();
    }

    async linkUpsell(request: FastifyRequest, response: FastifyReply) {
        const { productId, upsellProductId } = request.body as Upsell;

        try {
            await this.upsellService.linkUpsell(productId, upsellProductId);
            response.send({ message: 'Upsell product linked successfully' });
        } catch (error) {
            response.status(500).send({ message: 'Error linking upsell product', error });
        }
    }

    async getUpsells(request: FastifyRequest, response: FastifyReply) {
        const { productId } = request.params as { productId: number };

        if (isNaN(productId)) {
            return response.status(400).send({ message: 'Invalid product ID' });
        }

        try {
            const upsells = await this.upsellService.getUpsells(productId);
            response.send(upsells);
        } catch (error) {
            response.status(500).send({ message: 'Error retrieving upsell products', error });
        }
    }

    async removeUpsell(request: FastifyRequest, response: FastifyReply) {
        const { productId, upsellProductId } = request.params as RemoveUpsellParams;

        const productIdNum = Number(productId);
        const upsellProductIdNum = Number(upsellProductId);

        if (isNaN(productIdNum) || isNaN(upsellProductIdNum)) {
            return response.status(400).send({ message: 'Invalid product or upsell product ID' });
        }

        try {
            await this.upsellService.removeUpsell(productIdNum, upsellProductIdNum);
            response.send({ message: 'Upsell product removed successfully' });
        } catch (error) {
            response.status(500).send({ message: 'Error removing upsell product', error });
        }
    }
}
