import Product from "../model/product";
import Transaction from "../model/transaction";
import TransactionItem from "../model/transaction-item";


export class TransactionService {
    constructor() {}

     async createTransaction(items: Array<{ productId: number; quantity: number }>) {
        const transaction = await Transaction.create(); 
        
        let totalAmount = 0;

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            const amount = product.price * item.quantity;
            totalAmount += amount;

            await TransactionItem.create({
                transactionId: transaction.id,
                productId: item.productId,
                quantity: item.quantity,
            });
        }

        transaction.totalAmount = totalAmount;
        await transaction.save();

        return transaction;
    }
    
     async getTransaction(transactionId: number) {
        const transaction = await Transaction.findByPk(transactionId, {
            include: [
                {
                    model: TransactionItem,
                    include: [Product],
                },
            ],
        });
        return transaction;
    }
}

