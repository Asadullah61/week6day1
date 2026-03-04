// ===============================
// Week 6 Backend Project
// Instructor: Sohail Ahmed
// ===============================
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Home Route
app.get('/', (req, res) => {
    res.send("Week 6 Backend Server Running");
});

// CREATE Product
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ All Products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// UPDATE Product
app.put('/products/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// DELETE Product
app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
