import { Server } from "./server";

export class Application {
  public server: Server;

  constructor() {
    this.server = new Server();
  }

  public async startServer(port: number = 8000): Promise<void> {
    try {
      await this.server.start(port);
      console.log(`Application started on port ${port}`);
    } catch (error) {
      console.error(`Failed to start the server: ${error}`);
    }
  }
}

const app = new Application();
app.startServer();
