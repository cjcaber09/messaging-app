import express from "express"
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv"

// routers
import usersRoutes from './routes/users.routes'
import conversationsRoutes from "./routes/conversations.routes";
import messagesRoutes from "./routes/messages.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prefix = "/v1/api";
app.use(prefix + "/users", usersRoutes);
app.use(prefix + "/conversations", conversationsRoutes);
app.use(prefix + "/messages", messagesRoutes);

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running");
})
