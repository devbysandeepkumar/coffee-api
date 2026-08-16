import express from "express";
import router from "./routes/search.route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
}));

app.use("/api", router);

if (process.env.VERCEL !== "1") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
