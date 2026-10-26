import express, {
  type Application,
  type Request,
  type Response,
} from "express";

export const createApp = (): Application => {
  const app = express();

  app.use(express.json({ limit: "5mb" }));

  app.use("/", (req: Request, res: Response) => {
    return res.send("Hello im fine.")
  })

  app.use("/api/v1/health", (req: Request, res: Response) => {
    return res.send("Working")
  });

  return app;
};
