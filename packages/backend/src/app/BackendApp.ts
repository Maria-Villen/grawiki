import { Server } from './Server';

export class BackendApp {
	server?: Server;

	async start(): Promise<void> {
		const port: string = process.env.PORT ?? '3002';
		this.server = new Server(port);
		return await this.server.listen();
	}

	get httpServer(): Server['httpServer'] | undefined {
		return this.server?.getHTTPServer();
	}

	async stop(): Promise<void> {
		return await this.server?.stop();
	}
}