// server.js
require('dotenv').config();               // Load .env first

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const errorHandler = require('./middleware/errorHandler');
const Product    = require('./models/Product');

const app = express();

/* ───────────────── GLOBAL MIDDLEWARES ───────────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ───────────────── ROUTES ───────────────── */
app.use('/api/admin',     require('./routes/admin'));
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/users',     require('./routes/users'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/products',  require('./routes/productRoutes'));
app.use('/api/orders',    require('./routes/orders'));

// sample admin/users
app.route('/api/admin/users')
  .get((_, res) => res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]))
  .post((req, res) => res.status(201).json({ message: 'User created', user: req.body }));

// health check
app.get('/', (_, res) =>
  res.json({ message: '🟢 StockChain API is running!', version: '1.0.0' })
);


// 404 + central error handler
app.use((_, res) => res.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);

/* ───────────────── DB CONNECTION ───────────────── */
const connectDB = async () => {
  try {
    // Prefer Atlas URI from .env; otherwise use local MongoDB
    const LOCAL_URI = 'mongodb://127.0.0.1:27017/clothing_store';
    const uri       = process.env.MONGO_URI || LOCAL_URI;

    // Extra options for local connection
    const opts = uri.startsWith('mongodb+srv')
      ? { dbName: 'clothing_store' }
      : { dbName: 'clothing_store', directConnection: true, serverSelectionTimeoutMS: 5000 };

    await mongoose.connect(uri, opts);
    console.log(`✅ MongoDB connected ➜  DB: ${mongoose.connection.name}`);

    // Debug: list collections and product count
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));

    const productCount = await Product.countDocuments();
    console.log(`🛒 Products count: ${productCount}`);
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
};


/* ───────────────── START SERVER ───────────────── */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`)
  );

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 SIGINT received. Closing server…');
    await mongoose.disconnect();
    server.close(() => {
      console.log('👋 Server closed. Goodbye!');
      process.exit(0);
    });
  });
};

startServer();
