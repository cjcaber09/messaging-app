import express from "express"
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv"

// routers
import usersRoutes from './routes/users.routes'
import conversationsRoutes from "./routes/conversations.routes";
import messagesRoutes from "./routes/messages.routes";
// cookie
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ← your frontend URL
    credentials: true, // ← required for cookies
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const prefix = "/v1/api";
app.use(prefix + "/users", usersRoutes);
app.use(prefix + "/conversations", conversationsRoutes);
app.use(prefix + "/messages", messagesRoutes);

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running");
})
