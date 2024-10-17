import Fastify, { FastifyInstance } from 'fastify';
import { AuthRoute } from './routes/auth.routes';
import { ProductRoute } from './routes/product.routes';
import { TransactionRoute } from './routes/transaction.routes';
import { UpsellRoute } from './routes/upsell.routes';
import fastifyPassport from '@fastify/passport';
import { authenticateJWT } from './middleware/auth.middleware';
import { config } from 'dotenv';
import sequelize from './config/database';

config();

export class Server {
  public app: FastifyInstance;

  constructor() {
    this.app = Fastify();

    this.testConnection();
    this.registerMiddleware();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    const authRoute = new AuthRoute(this.app);
    const upSellRoute = new UpsellRoute(this.app);
    const productRoute = new ProductRoute(this.app);
    const transactionRoute = new TransactionRoute(this.app);

    this.app.register(authRoute.initialize);
    this.app.register(upSellRoute.initialize);
    this.app.register(productRoute.initialize);
    this.app.register(transactionRoute.initialize);
  }

  private registerMiddleware(): void {
    this.app.addHook('preHandler', async (request, reply) => {
      const publicRoutes = ['/login', '/signup'];
      if (publicRoutes.some(route => request.url.startsWith(route))) {
        return;
      }
      await authenticateJWT(request, reply);
    });
  }

  public async start(port: number): Promise<void> {
    try {
      await this.app.listen({ port });
      console.log(`Server is running on port ${port}`);
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  private async testConnection(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
  }
}
