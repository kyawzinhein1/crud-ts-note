import { useEffect, useState } from "react";
import { deleteNote, getNotes, updateNote } from "../services/note";
import { Note } from "../types/note";
import Input from "./Input";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editNote, setEditNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    };
    fetchNote();
  }, []);

  const handleAddNote = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleUpdateNote = async (updatedNote: Note) => {
    try {
      const updated = await updateNote(updatedNote._id, updatedNote.title);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === updated._id ? updated : note))
      );
    } catch (error) {
      throw new Error("Failed to update note.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      throw new Error("Failed to delete note.");
    }
  };

  return (
    <div>
      <h2>Note List</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note.title}{" "}
            <button
              type="button"
              onClick={() => {
                handleDeleteNote(note._id);
              }}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                setEditNote(note);
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <Input
        onAddNote={handleAddNote}
        onUpdateNote={handleUpdateNote}
        editingNote={editNote}
        setEditingNote={setEditNote}
      />
    </div>
  );
};

export default NoteList;
