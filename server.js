import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { logger } from "./services/logger.service.js";
import { setupAsyncLocalStorage } from "./middlewares/setupAls.middleware.js";
import { socketService } from "./services/socket.service.js";

import { boardRoutes } from "./api/board/board.routes.js";
import { userRoutes } from "./api/user/user.routes.js";
import { authRoutes } from "./api/auth/auth.routes.js";

const app = express();
const server = http.createServer(app); // ASK - Changes in the app will affect the server. How?
const PORT = process.env.PORT || 3030;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public"))); // ASK - path.resolve? How does it know about 'public'?
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:3000", // ASK - What are those ports (3000, 5173)?
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// App configuration
// app.use(express.static('public')) // ASK - Why should I delete it? If we are in DEV it wouldn't work?
app.use(express.json()); // ASK
app.use(cookieParser());

// AsyncLocalStorage
app.all("*", setupAsyncLocalStorage); // ASK - Will it always keep searching for path if we have 'next'? Is it TRUE for regular paths too?

// Routes
app.use("/api/board", boardRoutes);
app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes)

// Fallback route
app.get("/**", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// Socket setup
socketService.setupSocketAPI(server);

// Listening port
server.listen(PORT, () => {
  // ASK - Should we define the PORT variable in the .env file?
  logger.info("Server is running on port: " + PORT);
});
