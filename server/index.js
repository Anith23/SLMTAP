const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// --------------------
// Schemas & Models
// --------------------

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  hospitalType: { type: String },
}, { timestamps: true });
const Hospital = mongoose.model('Hospital', hospitalSchema);

const treatmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  availability: { type: String, enum: ['Available', 'Not Available'], default: 'Available' },
  description: { type: String, default: '' }
}, { timestamps: true });
const Treatment = mongoose.model('Treatment', treatmentSchema);

// --------------------
// Routes
// --------------------

// Root
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
});

// Hospitals
app.get('/api/hospitals', async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });
    res.json(hospitals);
  } catch (error) {
    console.error('Failed to fetch hospitals:', error);
    res.status(500).json({ message: 'Server error fetching hospitals' });
  }
});

app.post('/api/hospitals', async (req, res) => {
  try {
    const { name, location, contact, hospitalType } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: 'Please provide name and location' });
    }
    const newHospital = new Hospital({ name, location, contact, hospitalType });
    await newHospital.save();
    res.status(201).json(newHospital);
  } catch (error) {
    console.error('Failed to add hospital:', error);
    res.status(500).json({ message: 'Server error adding hospital' });
  }
});

app.put('/api/hospitals/:id', async (req, res) => {
  try {
    const { name, location, contact, hospitalType } = req.body;
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { name, location, contact, hospitalType },
      { new: true, runValidators: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(updatedHospital);
  } catch (error) {
    console.error('Failed to update hospital:', error);
    res.status(500).json({ message: 'Server error updating hospital' });
  }
});

app.delete('/api/hospitals/:id', async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json({ message: 'Hospital deleted' });
  } catch (error) {
    console.error('Failed to delete hospital:', error);
    res.status(500).json({ message: 'Server error deleting hospital' });
  }
});

// Treatments
app.get('/api/treatments', async (req, res) => {
  try {
    const { district, hospitalType } = req.query;
    if (district && hospitalType) {
      const hospitals = await Hospital.find({ location: district, hospitalType });
      const hospitalIds = hospitals.map(h => h._id);
      const treatments = await Treatment.find({ hospital: { $in: hospitalIds } }).populate('hospital').sort({ createdAt: -1 });
      res.json(treatments);
    } else {
      const treatments = await Treatment.find().populate('hospital').sort({ createdAt: -1 });
      res.json(treatments);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching treatments' });
  }
});

app.post('/api/treatments', async (req, res) => {
  console.log('POST /api/treatments body:', req.body); // Debug log
  try {
    const { name, hospital, availability, description } = req.body;
    if (!name || !hospital) {
      return res.status(400).json({ message: 'Name and Hospital are required' });
    }
    const hospitalExists = await Hospital.findById(hospital);
    if (!hospitalExists) {
      return res.status(400).json({ message: 'Invalid hospital ID' });
    }
    const newTreatment = new Treatment({ name, hospital, availability, description });
    await newTreatment.save();
    await newTreatment.populate('hospital');  // updated populate syntax
    res.status(201).json(newTreatment);
  } catch (err) {
    console.error('Error adding treatment:', err);
    res.status(500).json({ message: 'Server error adding treatment' });
  }
});

app.put('/api/treatments/:id', async (req, res) => {
  try {
    const { name, hospital, availability, description } = req.body;
    if (!name || !hospital) {
      return res.status(400).json({ message: 'Name and Hospital are required' });
    }
    const hospitalExists = await Hospital.findById(hospital);
    if (!hospitalExists) {
      return res.status(400).json({ message: 'Invalid hospital ID' });
    }
    const updatedTreatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      { name, hospital, availability, description },
      { new: true, runValidators: true }
    ).populate('hospital');
    if (!updatedTreatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    res.json(updatedTreatment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating treatment' });
  }
});

app.delete('/api/treatments/:id', async (req, res) => {
  try {
    const deletedTreatment = await Treatment.findByIdAndDelete(req.params.id);
    if (!deletedTreatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    res.json({ message: 'Treatment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting treatment' });
  }
});

// Additional dropdown/filter routes
app.get('/api/districts', async (req, res) => {
  try {
    const districts = await Hospital.distinct('location');
    res.json(districts);
  } catch (err) {
    console.error('Error fetching districts:', err);
    res.status(500).json({ message: 'Server error fetching districts' });
  }
});

app.get('/api/hospitalTypes', async (req, res) => {
  try {
    const { district } = req.query;
    if (!district) return res.status(400).json({ message: 'District query parameter required' });
    const hospitalTypes = await Hospital.find({ location: district }).distinct('hospitalType');
    res.json(hospitalTypes);
  } catch (err) {
    console.error('Error fetching hospital types:', err);
    res.status(500).json({ message: 'Server error fetching hospital types' });
  }
});

app.get('/api/search', async (req, res) => {
  const { district, hospitalType, treatment } = req.query;
  if (!district || !hospitalType || !treatment) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }
  try {
    const hospitals = await Hospital.find({ location: district, hospitalType: hospitalType });
    const hospitalIds = hospitals.map(h => h._id);
    const treatments = await Treatment.find({ name: treatment, hospital: { $in: hospitalIds } }).populate('hospital');
    const results = treatments.map(t => ({
      _id: t._id,
      treatmentName: t.name,
      hospitalName: t.hospital.name,
      district: t.hospital.location,
      hospitalType: t.hospital.hospitalType,
      contact: t.hospital.contact || '',
    }));
    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
