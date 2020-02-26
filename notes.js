const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.bgGreen.bold('New note is added!'));
  } else {
    console.log(chalk.bgRed.bold('Note title is already taken'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const updatedNotes = notes.filter(note => note.title !== title);
  if (notes.length === updatedNotes.length) {
    console.log(chalk.bgRed.bold('No note found!'));
  } else {
    saveNotes(updatedNotes);
    console.log(chalk.bgGreen.bold('Note removed!'));
  }
}

const readNote = title => {
  const notes = loadNotes();
  const foundNote = notes.find(note => note.title === title);
  if (foundNote) {
    console.log(chalk.inverse.bold(foundNote.title));
    console.log(foundNote.body);
  } else {
    console.log(chalk.bgRed.bold('No note found'));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse.bold('Your notes'));
  notes.forEach(note => console.log(note.title));
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = { addNote, removeNote, readNote, listNotes };