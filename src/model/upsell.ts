import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Product from "./product";

class Upsell extends Model {
  public productId!: number;
  public upsellProductId!: number;
}

Upsell.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      primaryKey: true,
    },
    upsellProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "upsells",
  }
);

Product.belongsToMany(Product, {
  through: Upsell,
  as: "upsells",
  foreignKey: "productId",
});

Product.belongsToMany(Product, {
  through: Upsell,
  as: "products",
  foreignKey: "upsellProductId",
});

export default Upsell;
