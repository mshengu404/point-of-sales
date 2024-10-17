import Product from "../model/product";
import Upsell from "../model/upsell";

export class UpsellService {
  constructor() {}

  async linkUpsell(productId: number, upsellProductId: number) {
    return await Upsell.create({ productId, upsellProductId });
  }

  async getUpsells(productId: number) {
    const product = await Product.findByPk(productId, {
      include: [{ model: Product, as: "upsells" }],
    });
    return product ? product : [];
  }

  async removeUpsell(productId: number, upsellProductId: number) {
    return await Upsell.destroy({
      where: {
        productId,
        upsellProductId,
      },
    });
  }
}
