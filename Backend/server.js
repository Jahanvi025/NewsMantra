import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Enable CORS for frontend communication
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Temporary in-memory storage for products
let products = [
    { id: 1, name: "Satin Slip Dress", price: 59.99, description: "Luxurious satin slip dress for an elegant evening look.", category: "Clothing - Dresses" },
    { id: 2, name: "Running Shoes", price: 79.99, description: "Lightweight running shoes for daily workouts.", category: "Footwear" }
];

// 🏠 Home route
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// 📦 Get all products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// ➕ Add a new product
app.post("/api/products", (req, res) => {
    const { name, price, description, category } = req.body;
    
    if (!name || !price || !description || !category) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = {
        id: products.length + 1, 
        name, 
        price, 
        description, 
        category
    };

    products.push(newProduct);
    res.status(201).json({ success: true, product: newProduct });
});

// 🛠 Update a product
app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    
    const productIndex = products.findIndex((p) => p.id == id);
    if (productIndex === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    products[productIndex] = { id: Number(id), name, price, description, category };
    res.json({ success: true, product: products[productIndex] });
});

// ❌ Delete a product
app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    products = products.filter((p) => p.id != id);
    res.json({ success: true, message: "Product deleted successfully" });
});

// 🚀 Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
