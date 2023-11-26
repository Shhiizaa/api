export default function NotesDatabase({ title, text }) {
  return fetch("http://localhost:5001/notes")
    .then((response) => response.json())
    .then((notes) => {
      const maxId = Math.max(...notes.map((note) => note.id));
      const newNoteId = parseInt(localStorage.getItem("noteId")) || maxId + 1;

      const newNote = {
        id: parseInt(newNoteId),
        authorId: localStorage.getItem("userId"),
        title: title,
        text: text,
        createdAt: Date.now(),
      };
      console.log(localStorage.getItem("noteId"));
      if (parseInt(localStorage.getItem("noteId")) !== 0) {
        fetch(`http://localhost:5001/notes/${newNoteId}`, {
          method: "DELETE",
        }).then((response) => response.json());
      }
      localStorage.setItem("noteId", newNoteId);
      return fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      }).then((r) => r.json());
    });
}
