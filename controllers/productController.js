const Product = require('../models/Product'); // ✅ this uses the correct 'products' collection

exports.getProducts = async (req, res) => {
  try {
    // Debugging: Verify connection and collection
    console.log('DB Name:', mongoose.connection.db.databaseName);
    console.log('Collection Name:', Product.collection.name);
    
    const count = await Product.countDocuments();
    console.log(`Total products: ${count}`);
    console.log('Collection Name:', Product.collection.name);  // should log: product


    if (count === 0) {
      return res.status(404).json({ 
        message: 'No products found',
        db: mongoose.connection.db.databaseName,
        collection: Product.collection.name 
      });
    }

    const products = await Product.find();
    console.log('Raw products from DB:', products);

    const flat = products.map(p => ({
      id: p._id,
      name: p.name,
      category: p.category,
      quantity: p.stock,
      price: p.price,
      status: p.stock > 0 ? 'In Stock' : 'Out of Stock',
      lastUpdated: p.updatedAt,
    }));

    res.json(flat);
  } catch (err) {
    console.error('GET /api/products error', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};
