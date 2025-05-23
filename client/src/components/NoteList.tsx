import { useEffect, useState } from "react";
import { deleteNote, getNotes, updateNote } from "../services/note";
import { Note } from "../types/note";
import Input from "./Input";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editNote, setEditNote] = useState<Note | null>(null);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

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
      <h2 className="text-xl font-bold">Share</h2>
      {userInfo ? (
        <Input
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          editingNote={editNote}
          setEditingNote={setEditNote}
        />
      ) : (
        <p className="border-2 px-4 py-2 w-fit my-4 rounded-md">
          <Link to={"/login"} className="font-bold underline">
            Login
          </Link>{" "}
          for creating your own share.
        </p>
      )}
      <ul>
        {notes.map((note, index) => (
          <li key={index} className="flex items-center gap-2 mb-2">
            <p className="font-semibold">{note.title}</p>
            {note.userId === userInfo?._id && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteNote(note._id);
                  }}
                  className="text-red-600 underline font-medium cursor-pointer"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditNote(note);
                  }}
                  className="underline font-medium cursor-pointer"
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
