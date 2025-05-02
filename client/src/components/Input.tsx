import { useEffect, useState } from "react";
import { createNote } from "../services/note";
import { Note } from "../types/note";

interface Props {
  onAddNote: (note: Note) => void;
  onUpdateNote: (note: Note) => void;
  editingNote: Note | null;
  setEditingNote: (note: Note | null) => void;
}

const Input = ({
  onAddNote,
  onUpdateNote,
  editingNote,
  setEditingNote,
}: Props) => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (editingNote) {
      setMsg(editingNote.title);
    }
  }, [editingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) return;

    try {
      if (editingNote) {
        await onUpdateNote({ ...editingNote, title: msg });
        setEditingNote(null);
      } else {
        const newNote = await createNote(msg);
        onAddNote(newNote);
      }
      setMsg("");
    } catch (error) {
      throw new Error("Failed to save note.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Enter note title..."
        />
        <button type="submit">{editingNote ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default Input;
