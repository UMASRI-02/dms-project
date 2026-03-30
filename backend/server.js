const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files (ONLY ONCE)
app.use('/uploads', express.static('uploads'));

// ✅ Routes
const documentRoutes = require('./routes/documentRoutes');
app.use('/api/documents', documentRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const shareRoutes = require('./routes/shareRoutes');
app.use('/api/share', shareRoutes);

// ✅ MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/dms')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});