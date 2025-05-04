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
    <div className="mt-2 mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Enter note title..."
          className="border p-2 rounded-sm mr-2"
        />
        <button
          type="submit"
          className="text-white bg-black py-2 px-4 border rounded-sm cursor-pointer"
        >
          {editingNote ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Input;
