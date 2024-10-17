import { FastifyRequest, FastifyReply } from 'fastify';
import { TransactionService } from '../service/transaction.service';

export class TransactionController {

    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }
    // Create a new sale transaction
     async createTransaction(request: FastifyRequest, response: FastifyReply) {
        const items  = request.body as unknown as [];

        try {
            const transaction = await this.transactionService.createTransaction(items);
            response.send({ transactionId: transaction.id, totalAmount: transaction.totalAmount });
        } catch (error) {
            response.status(400).send({ message: "error.message" });
        }
    }

    // Retrieve details of a specific transaction
     async getTransaction(request: FastifyRequest, response: FastifyReply) {
        const transactionId: number = request.params as unknown as number;

        try {
            const transaction = await this.transactionService.getTransaction(transactionId);
            if (!transaction) {
                return response.status(404).send({ message: 'Transaction not found' });
            }
            response.send(transaction);
        } catch (error) {
            response.status(500).send({ message: 'Error retrieving transaction', error });
        }
    }
}
