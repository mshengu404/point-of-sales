import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Product from "./product";
import Transaction from "./transaction";

class TransactionItem extends Model {
  public transactionId!: number;
  public productId!: number;
  public quantity!: number;
}

TransactionItem.init(
  {
    transactionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Transaction,
        key: "id",
      },
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transaction_items",
  }
);

Transaction.hasMany(TransactionItem, { foreignKey: "transactionId" });
TransactionItem.belongsTo(Transaction, { foreignKey: "transactionId" });
TransactionItem.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(TransactionItem, { foreignKey: "productId" });

export default TransactionItem;
