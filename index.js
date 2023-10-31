const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());



const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const noteSchema = new mongoose.Schema({
  subject: String,
  chapterNo: Number,
  chapterName: String,
  text: String
});

const Note = mongoose.model('Note', noteSchema);

app.post('/notes',  async (req, res) => {
    try {
  const { subject, chapterNo, chapterName, text } = req.body;
  const newNote = new Note({
      subject,
      chapterNo,
      chapterName,
      text
  });
  newNote.save();
  res.status(201).json({
    success: true,
    message: 'saved successfully.',
    
  });
} catch (error) {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Failed to save .',
    error: error,
  });
}
});




app.get('/notes', async (req, res) => {
    try {
      const experiences = await Note.find();
      res.json(experiences);
    } catch (error) {
      alert(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch.',
        error: error,
      });
    }
  });

  


// Update an experience
app.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { subject, chapterNo, chapterName, text } = req.body;
  
    try {
      const updatedExperience = await Note.findByIdAndUpdate(id, {
        subject : subject,
         chapterNo : chapterNo,
         chapterName : chapterName,
          text:text
      }, { new: true });
  
      res.json(updatedExperience);
    } catch (error) {
      console.error('Error updating experience', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  



// Delete an experience
app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Note.findByIdAndDelete(id);
  
      res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
      console.error('Error deleting experience', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  










app.get("/", (req,res) =>{
  res.send("Backend server for ordering items has started running successfully...");
});




const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
