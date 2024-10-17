import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Transaction extends Model {
    public id!: number;
    public totalAmount!: number;
    public createdAt!: Date;
}

Transaction.init(
    {
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'transactions',
        timestamps: true, // Enable timestamps to track creation time
    }
);

export default Transaction;
