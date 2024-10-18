import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Transaction extends Model {
  public id!: number;
  public totalAmount!: number;
  public createdAt!: Date;
}

Transaction.init(
  {
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "transactions",
    timestamps: true,
  }
);

export default Transaction;
