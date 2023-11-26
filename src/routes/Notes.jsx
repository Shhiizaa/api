import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const id = localStorage.getItem("userId");
  const allNotes = await fetch(`http://localhost:5001/notes`).then((response) =>
    response.json()
  );
  const notes = allNotes
    .filter((note) => note.authorId === id)
    .sort((a, b) => b.createdAt - a.createdAt);
  return { notes };
};

const handleDelete = async (id) => {
  await fetch(`http://localhost:5001/notes/${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

function Notes() {
  const { notes } = useLoaderData();
  return (
    <div>
      <div className="p-4 md:p-8 text-center">
        <a href="/notes/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8">
            Add new note
          </button>
        </a>
      </div>
      {notes.map((note) => {
        const date = new Date(note.createdAt);
        return (
          <div
            key={note.id}
            className="flex items-center border p-3 my-2 mx-3 relative"
          >
            <Link
              onClick={() => localStorage.setItem("noteId", note.id)}
              to={`/notes/${note.id}`}
              className="flex-1"
            >
              <span className="font-bold mr-2">{note.title}</span>
              <span className="text-sm text-gray-500">
                {date.getDay()}.{date.getMonth()}.{date.getFullYear()}
              </span>
            </Link>
            <div className="absolute top-1 right-1 flex">
              <Link to={`/notes/edit`} className="flex-1">
                <span
                  onClick={() => localStorage.setItem("noteId", note.id)}
                  role="img"
                  aria-label="edit"
                  className="mr-2"
                >
                  ✍️
                </span>
              </Link>
              <span
                onClick={() => handleDelete(note.id)}
                role="img"
                aria-label="delete"
              >
                🗑️
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(Notes);
