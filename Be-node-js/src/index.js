const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./configs/db.js');
const routes = require('./routes/index.routers.js');

// Load env variables
dotenv.config();

// Kết nối MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve thư mục upload ảnh
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_PATH)));

// Routes
app.use('/api', routes);


// Start server
const PORT = process.env.PORT || 5000;app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});