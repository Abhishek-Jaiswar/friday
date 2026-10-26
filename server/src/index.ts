import { createServer } from "node:http";
import { createApp } from "./app";
import { Env } from "./config/env.config";
import { initSocketServer } from "./ws/socket";

async function main(): Promise<void> {
  const PORT = Env.PORT ?? 8080;
  const app = createApp();
  const httpServer = createServer(app);

  initSocketServer(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
  });
}
main().catch((err: unknown) => {
  console.error("💥 FATAL STARTUP ERROR: ", err);
  process.exit(1);
});
