const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/product-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' } // Добавлено поле role
});

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret_key', { expiresIn: '1h' });
    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.userRole !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/products', authenticate, authorize('admin'), async (req, res) => { // Защищенный маршрут
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
