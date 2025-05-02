import { Note } from "../types/note";

let API_URL = "";

if (import.meta.env.VITE_MODE === "development") {
  API_URL = import.meta.env.VITE_LOCAL_API_URL;
}

if (import.meta.env.VITE_MODE === "production") {
  API_URL = import.meta.env.VITE_API_URL;
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${API_URL}/todos`);
  const data = await response.json();
  return data.todo;
};

export const createNote = async (title: string): Promise<Note> => {
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  return data.todo;
};

export const updateNote = async (id: string, title: string): Promise<Note> => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  return data.todo;
};


export const deleteNote = async (id: string) => {
  await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
  });
};
