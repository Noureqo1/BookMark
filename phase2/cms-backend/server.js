const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, Content } = require('./models/content');  // Import sequelize and Content model

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database connected and synced successfully');
  })
  .catch((err) => {
    console.log('Error syncing database:', err);
  });

// MongoDB Routes
const mongoContentRoutes = require('./routes/mongoContentRoutes');
app.use('/mongo-content', mongoContentRoutes);

// API Routes

// Create Content (for Sequelize)
app.post('/content', async (req, res) => {
  try {
    const { title, description, mediaUrl } = req.body;
    const newContent = await Content.create({ title, description, mediaUrl });
    res.status(201).json(newContent);  // Return created content
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
});

// Get All Content (for Sequelize)
app.get('/content', async (req, res) => {
  try {
    const content = await Content.findAll();
    res.status(200).json(content);  // Return all content
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error });
  }
});

// Get Content by ID (for Sequelize)
app.get('/content/:id', async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json(content);  // Return content by ID
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content by ID', error });
  }
});

// Update Content by ID (for Sequelize)
app.put('/content/:id', async (req, res) => {
  try {
    const { title, description, mediaUrl } = req.body;
    const content = await Content.findByPk(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Update the content
    content.title = title || content.title;
    content.description = description || content.description;
    content.mediaUrl = mediaUrl || content.mediaUrl;

    await content.save();
    res.status(200).json(content);  // Return updated content
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
});

// Delete Content by ID (for Sequelize)
app.delete('/content/:id', async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Delete the content
    await content.destroy();
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error });
  }
});

// Test route for backend
app.get('/', (req, res) => {
  res.send('Welcome to the CMS Backend');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cms_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));
