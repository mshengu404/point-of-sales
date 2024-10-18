import { FastifyInstance } from "fastify";
import { TransactionController } from "../controller/transaction.controller";

export class TransactionRoute {
  private transactionController: TransactionController;

  constructor(public _app: FastifyInstance) {
    this.transactionController = new TransactionController();
  }

  initialize = () => {
    this._app.post(
      "/transactions",
      this.transactionController.createTransaction
    );
    this._app.get(
      "/transactions/:transactionId",
      this.transactionController.getTransaction
    );
  };
}
