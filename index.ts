import express from "express";
import router from "./src/routes/search.route";
import cors from "cors";
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", router);



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
