import Product from "../model/product";
import Transaction from "../model/transaction";
import TransactionItem from "../model/transaction-item";

export class TransactionService {
  constructor() {}

  createTransaction = async (
    items: Array<{ productId: number; quantity: number }>
  ) => {
    let totalAmount = 0;
    const transaction = await Transaction.create();

    if (!transaction) {
      throw new Error("Failed to create transaction");
    }

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for Product ID ${item.productId}`);
      }

      const amount = Number(product.dataValues.price) * Number(item.quantity);
      totalAmount += amount;

      await TransactionItem.create({
        transactionId: transaction.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    const updateTransaction = await Transaction.findOne({
      where: { id: transaction.id },
    });

    if (!updateTransaction) {
      throw new Error("Failed to update Transaction");
    }

    updateTransaction.update({ totalAmount: Number(totalAmount) });

    return { id: transaction.id, totalAmount };
  };

  getTransaction = async (transactionId: number) => {
    const transaction = await Transaction.findByPk(transactionId, {
      include: [
        {
          model: TransactionItem,
          include: [Product],
        },
      ],
    });
    return transaction;
  };
}
