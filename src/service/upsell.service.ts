import Product from "../model/product";
import Upsell from "../model/upsell";

export class UpsellService {
  constructor() {}

  linkUpsell = async (
    productId: number,
    upsellProductId: number
  ): Promise<Upsell> => {
    const upsell = await Upsell.create({ productId, upsellProductId });
    return upsell;
  };

  getUpsells = async (productId: number): Promise<Product[]> => {
    const product = await Product.findByPk(productId, {
      include: [{ model: Product, as: "upsells" }],
    });
    console.log("product", product);
    return product?.dataValues.upsells || [];
  };

  removeUpsell = async (
    productId: number,
    upsellProductId: number
  ): Promise<boolean> => {
    const deletedCount = await Upsell.destroy({
      where: {
        productId,
        upsellProductId,
      },
    });
    return deletedCount > 0;
  };
}
