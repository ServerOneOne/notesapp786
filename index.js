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

app.post('/notes', (req, res) => {
  const { subject, chapterNo, chapterName, text } = req.body;
  const newNote = new Note({
      subject,
      chapterNo,
      chapterName,
      text
  });
  newNote.save((err) => {
      if (err) {
          console.error(err);
          res.status(500).send(err);
      } else {
          res.send({ subject, chapterName });
      }
  });
});

app.get('/notes', (req, res) => {
  Note.find({}, 'subject chapterNo chapterName text', (err, notes) => {
      if (err) {
          console.error(err);
          res.status(500).send(err);
      } else {
          const formattedNotes = notes.map(note => ({
              subject: note.subject,
              chapterNo: note.chapterNo,
              chapterName: note.chapterName,
              text: note.text
          }));
          res.send(formattedNotes);
      }
  });
});

app.put('/notes/:id', (req, res) => {
  const { subject, chapterNo, chapterName, text } = req.body;
  const noteId = req.params.id;

  Note.findByIdAndUpdate(noteId, { subject, chapterNo, chapterName, text }, { new: true }, (err, updatedNote) => {
      if (err) {
          console.error(err);
          res.status(500).send(err);
      } else {
          res.send(updatedNote);
      }
  });
});

app.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  Note.findByIdAndRemove(noteId, (err, deletedNote) => {
      if (err) {
          console.error(err);
          res.status(500).send(err);
      } else {
          res.send(deletedNote);
      }
  });
});














app.get("/", (req,res) =>{
  res.send("Backend server for ordering items has started running successfully...");
});




const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
