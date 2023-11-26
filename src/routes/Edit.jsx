import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotesDatabase from "../components/NotesDatabase";

export default function Edit() {
  const navigate = useNavigate();
  const id = localStorage.getItem("noteId");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5001/notes/${id}`)
      .then((r) => r.json())
      .then((note) => {
        setTitle(note.title);
        setText(note.text);
      });
  }, []);

  function handleSave(title, text) {
    if (!title.trim()) {
      setError("Имя заметки не должно быть пустым");
    } else {
      NotesDatabase({ title, text }).then(() => {
        const id = localStorage.getItem("noteId");
        navigate(`/notes/${id}`);
      });
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 md:p-8 text-center bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl md:text-4xl mb-8">Edit</h1>
        <input
          className="block w-full md:w-72 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
          placeholder="Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <textarea
          className="w-full h-40 py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white peer"
          placeholder="Note text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={() => handleSave(title, text)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8"
        >
          Save
        </button>
        <a href="/notes">
          <button
            onClick={() => localStorage.setItem("noteId", 0)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8"
          >
            Back
          </button>
        </a>
      </div>
    </div>
  );
}
