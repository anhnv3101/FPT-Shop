import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./configs/db.js";
import routes from "./routes/index.routers.js";

// Load env variables
config();

// Khởi tạo __dirname cho ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Kết nối MongoDB
connectDB();

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Serve thư mục upload ảnh
app.use(
  "/uploads",
  express.static(join(__dirname, process.env.UPLOAD_PATH))
);

// Routes
app.use("/api", routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});
